// services/product.service.js
import Product from "../models/Product.js";

export async function findProducts(queryParams) {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    onSale,
    sortBy,
  } = queryParams;

  const filter = { isActive: true };

  if (keyword) filter.$text = { $search: keyword };
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter["price.base"] = {};
    if (minPrice) filter["price.base"].$gte = Number(minPrice);
    if (maxPrice) filter["price.base"].$lte = Number(maxPrice);
  }
  if (onSale === "true") filter["price.sale"] = { $ne: null };

  let query = Product.find(filter).populate("category");

  if (sortBy) {
    const sortOptions = {
      newest: { createdAt: -1 },
      views: { views: -1 },
      priceAsc: { "price.base": 1 },
      priceDesc: { "price.base": -1 },
    };
    query = query.sort(sortOptions[sortBy] || { createdAt: -1 });
  }

  return query.exec();
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
