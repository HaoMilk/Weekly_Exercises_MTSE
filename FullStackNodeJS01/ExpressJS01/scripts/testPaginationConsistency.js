// scripts/testPaginationConsistency.js
import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { validatePaginationConsistency } from "../src/services/product.service.js";

async function testPaginationConsistency() {
  try {
    await connectDB();
    console.log("🧪 Bắt đầu test tính nhất quán của phân trang...");

    // Test với các kích thước trang khác nhau
    const pageSizes = [5, 10, 20];
    
    for (const pageSize of pageSizes) {
      console.log(`\n📊 Test với pageSize = ${pageSize}:`);
      const result = await validatePaginationConsistency(pageSize, 3);
      
      console.log(`- Tổng số sản phẩm: ${result.totalProducts}`);
      console.log(`- Tổng số trang: ${result.totalPages}`);
      console.log(`- Số sản phẩm duy nhất: ${result.uniqueProducts}`);
      console.log(`- Số hình ảnh duy nhất: ${result.uniqueImages}`);
      console.log(`- Số hình ảnh trùng lặp trong phân trang: ${result.duplicateImagesInPagination}`);
      
      if (result.duplicateImagesInPagination === 0) {
        console.log("✅ Phân trang hoạt động chính xác!");
      } else {
        console.log("⚠️  Có hình ảnh trùng lặp trong phân trang!");
      }
    }

    console.log("\n🎉 Hoàn thành test!");

  } catch (error) {
    console.error("❌ Lỗi trong quá trình test:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Đã ngắt kết nối database");
  }
}

// Chạy test
testPaginationConsistency();
