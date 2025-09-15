// services/product.service.js
import Product from "../models/Product.js";

export async function findProducts(queryParams) {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    onSale,
    minViews,
    maxViews,
    tags,
    inStock,
    sortBy,
    page = 1,
    limit = 10,
  } = queryParams;

  const filter = { isActive: true };

  // Fuzzy Search với nhiều cách tìm kiếm
  if (keyword) {
    const searchTerm = keyword.trim();
    
    // Tạo regex pattern cho fuzzy search
    const fuzzyPattern = searchTerm
      .split('')
      .map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*');
    
    const regexPattern = new RegExp(fuzzyPattern, 'i');
    
    // Tìm kiếm trong nhiều trường với độ ưu tiên khác nhau
    filter.$or = [
      // Tìm kiếm chính xác trong tên sản phẩm (độ ưu tiên cao nhất)
      { name: { $regex: searchTerm, $options: 'i' } },
      // Fuzzy search trong tên sản phẩm
      { name: { $regex: regexPattern, $options: 'i' } },
      // Tìm kiếm trong description
      { description: { $regex: searchTerm, $options: 'i' } },
      // Tìm kiếm trong tags
      { tags: { $regex: searchTerm, $options: 'i' } }
    ];
  }

  // Lọc theo danh mục
  if (category) {
    if (Array.isArray(category)) {
      filter.category = { $in: category };
    } else {
      filter.category = category;
    }
  }

  // Lọc theo giá
  if (minPrice || maxPrice) {
    filter["price.base"] = {};
    if (minPrice) filter["price.base"].$gte = Number(minPrice);
    if (maxPrice) filter["price.base"].$lte = Number(maxPrice);
  }

  // Lọc theo giá khuyến mãi
  if (onSale === "true") {
    filter["price.sale"] = { $ne: null, $gt: 0 };
  } else if (onSale === "false") {
    filter["price.sale"] = { $in: [null, 0] };
  }

  // Lọc theo lượt xem
  if (minViews || maxViews) {
    filter.views = {};
    if (minViews) filter.views.$gte = Number(minViews);
    if (maxViews) filter.views.$lte = Number(maxViews);
  }

  // Lọc theo tags
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(',');
    filter.tags = { $in: tagArray.map(tag => tag.trim()) };
  }

  // Lọc theo tồn kho
  if (inStock === "true") {
    filter.stock = { $gt: 0 };
  } else if (inStock === "false") {
    filter.stock = { $lte: 0 };
  }

  // Tính toán phân trang
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // Đếm tổng số sản phẩm
  const totalProducts = await Product.countDocuments(filter);

  let query = Product.find(filter)
    .populate("category")
    .skip(skip)
    .limit(limitNumber);

  // Sắp xếp với nhiều tùy chọn hơn
  if (sortBy) {
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      views: { views: -1 },
      viewsAsc: { views: 1 },
      priceAsc: { "price.base": 1 },
      priceDesc: { "price.base": -1 },
      nameAsc: { name: 1 },
      nameDesc: { name: -1 },
      stockAsc: { stock: 1 },
      stockDesc: { stock: -1 },
      // Sắp xếp theo độ phù hợp khi có keyword
      relevance: { createdAt: -1 }
    };
    
    const sortOption = sortOptions[sortBy] || { createdAt: -1 };
    query = query.sort(sortOption);
  }

  const products = await query.exec();

  // Tính toán thông tin phân trang
  const totalPages = Math.ceil(totalProducts / limitNumber);
  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;

  return {
    products,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      limit: limitNumber,
      hasNextPage,
      hasPrevPage,
    },
    filters: {
      keyword,
      category,
      minPrice,
      maxPrice,
      onSale,
      minViews,
      maxViews,
      tags,
      inStock,
      sortBy
    }
  };
}

export function findProductById(id) {
  return Product.findById(id).populate("category").exec();
}

export function createNewProduct(data) {
  return Product.create(data);
}

export function updateProductById(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true }).exec();
}

export function deleteProductById(id) {
  return Product.findByIdAndDelete(id).exec();
}

// Lấy danh sách categories để hỗ trợ filter
export async function getCategories() {
  const categories = await Product.aggregate([
    { $match: { isActive: true } },
    { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryInfo' } },
    { $unwind: '$categoryInfo' },
    { $group: { _id: '$category', name: { $first: '$categoryInfo.name' }, count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  return categories;
}

// Lấy danh sách tags phổ biến
export async function getPopularTags(limit = 20) {
  const tags = await Product.aggregate([
    { $match: { isActive: true, tags: { $exists: true, $ne: [] } } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
  return tags.map(tag => ({ name: tag._id, count: tag.count }));
}

// Tìm kiếm gợi ý (autocomplete)
export async function getSearchSuggestions(keyword, limit = 10) {
  if (!keyword || keyword.length < 2) return [];
  
  const regexPattern = new RegExp(keyword, 'i');
  
  const suggestions = await Product.aggregate([
    {
      $match: {
        isActive: true,
        $or: [
          { name: regexPattern },
          { tags: regexPattern }
        ]
      }
    },
    {
      $project: {
        name: 1,
        tags: 1,
        category: 1
      }
    },
    { $sort: { name: 1 } },
    { $limit: limit }
  ]);
  
  return suggestions;
}
