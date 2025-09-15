// routes/product.routes.js
import { Router } from "express"; // ✅ thêm import Router từ express
import { 
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  getProductTags,
  getProductSearchSuggestions, // ✅ dùng hàm đã đổi tên
} from "../controllers/product.controller.js";

const router = Router();

// 🟢 Các route đặc biệt (nên đặt trước /:id)
router.get("/categories/list", getProductCategories);
router.get("/tags/popular", getProductTags);
router.get("/suggestions", getProductSearchSuggestions); // gợi ý tìm kiếm

// 🟢 Route CRUD sản phẩm
router.get("/", listProducts); // hỗ trợ tìm kiếm & lọc
router.get("/:id", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
