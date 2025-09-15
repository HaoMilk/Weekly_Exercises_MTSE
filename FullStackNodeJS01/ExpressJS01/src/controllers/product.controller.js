// controllers/product.controller.js
import {
  findProducts,
  findProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
  getCategories,
  getPopularTags,
  getSearchSuggestions, // service function
  cleanDuplicateImages,
  validatePaginationConsistency,
} from "../services/product.service.js";

// 🟢 Lấy danh sách sản phẩm (hỗ trợ filter, sort, search)
export async function listProducts(req, res) {
  try {
    const products = await findProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Lấy chi tiết sản phẩm theo ID
export async function getProduct(req, res) {
  try {
    const product = await findProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Tạo sản phẩm mới
export async function createProduct(req, res) {
  try {
    const product = await createNewProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// 🟢 Cập nhật sản phẩm theo ID
export async function updateProduct(req, res) {
  try {
    const product = await updateProductById(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// 🟢 Xoá sản phẩm theo ID
export async function deleteProduct(req, res) {
  try {
    const deleted = await deleteProductById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Lấy danh sách category
export async function getProductCategories(req, res) {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Lấy danh sách tag phổ biến
export async function getProductTags(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const tags = await getPopularTags(limit);
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Gợi ý tìm kiếm sản phẩm (đổi tên để không trùng với service)
export async function getProductSearchSuggestions(req, res) {
  try {
    const { keyword } = req.query;
    const limit = parseInt(req.query.limit) || 10;

    if (!keyword || keyword.length < 2) {
      return res.json([]);
    }

    const suggestions = await getSearchSuggestions(keyword, limit);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Làm sạch hình ảnh trùng lặp
export async function cleanDuplicateImagesController(req, res) {
  try {
    const result = await cleanDuplicateImages();
    res.json({
      message: "Đã hoàn thành việc làm sạch hình ảnh trùng lặp",
      ...result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🟢 Kiểm tra tính nhất quán của phân trang
export async function validatePaginationController(req, res) {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const maxPages = parseInt(req.query.maxPages) || 5;
    
    const result = await validatePaginationConsistency(pageSize, maxPages);
    res.json({
      message: "Đã hoàn thành việc kiểm tra phân trang",
      ...result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
