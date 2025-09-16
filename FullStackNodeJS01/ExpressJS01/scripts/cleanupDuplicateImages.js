// scripts/cleanupDuplicateImages.js
import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { cleanDuplicateImages, validatePaginationConsistency } from "../src/services/product.service.js";

async function cleanupDuplicateImages() {
  try {
    await connectDB();
    console.log("🚀 Bắt đầu quá trình làm sạch hình ảnh trùng lặp...");

    // Bước 1: Kiểm tra hình ảnh trùng lặp hiện tại
    console.log("\n📊 Bước 1: Kiểm tra hình ảnh trùng lặp hiện tại");
    const checkResult = await checkDuplicateImages();
    
    if (checkResult.duplicateImages === 0) {
      console.log("✅ Không có hình ảnh trùng lặp cần làm sạch!");
      return;
    }

    // Bước 2: Làm sạch hình ảnh trùng lặp
    console.log("\n🧹 Bước 2: Làm sạch hình ảnh trùng lặp");
    const cleanResult = await cleanDuplicateImages();
    
    console.log(`\n📈 Kết quả làm sạch:`);
    console.log(`- Số sản phẩm được làm sạch: ${cleanResult.cleanedProducts}`);
    console.log(`- Số hình ảnh trùng lặp được loại bỏ: ${cleanResult.duplicateImages}`);

    // Bước 3: Kiểm tra lại sau khi làm sạch
    console.log("\n🔍 Bước 3: Kiểm tra lại sau khi làm sạch");
    const recheckResult = await checkDuplicateImages();
    
    if (recheckResult.duplicateImages === 0) {
      console.log("✅ Đã làm sạch thành công! Không còn hình ảnh trùng lặp.");
    } else {
      console.log(`⚠️  Vẫn còn ${recheckResult.duplicateImages} hình ảnh trùng lặp.`);
    }

    // Bước 4: Kiểm tra tính nhất quán của phân trang
    console.log("\n📄 Bước 4: Kiểm tra tính nhất quán của phân trang");
    const paginationResult = await validatePaginationConsistency(10, 5);
    
    console.log(`\n📊 Kết quả kiểm tra phân trang:`);
    console.log(`- Tổng số sản phẩm: ${paginationResult.totalProducts}`);
    console.log(`- Tổng số trang: ${paginationResult.totalPages}`);
    console.log(`- Số sản phẩm duy nhất: ${paginationResult.uniqueProducts}`);
    console.log(`- Số hình ảnh duy nhất: ${paginationResult.uniqueImages}`);
    console.log(`- Số hình ảnh trùng lặp trong phân trang: ${paginationResult.duplicateImagesInPagination}`);

    if (paginationResult.duplicateImagesInPagination === 0) {
      console.log("✅ Phân trang hoạt động chính xác! Không có hình ảnh trùng lặp giữa các trang.");
    } else {
      console.log(`⚠️  Có ${paginationResult.duplicateImagesInPagination} hình ảnh trùng lặp trong phân trang.`);
    }

    console.log("\n🎉 Hoàn thành quá trình làm sạch!");

  } catch (error) {
    console.error("❌ Lỗi trong quá trình làm sạch:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Đã ngắt kết nối database");
  }
}

// Hàm kiểm tra hình ảnh trùng lặp (sử dụng service)
async function checkDuplicateImages() {
  // Sử dụng API để kiểm tra thay vì truy cập trực tiếp database
  try {
    const response = await fetch('http://localhost:3000/api/products/validate-pagination?pageSize=100&maxPages=1');
    const data = await response.json();
    
    return {
      totalProducts: data.totalProducts,
      uniqueImages: data.uniqueImages,
      duplicateImages: data.duplicateImagesInPagination,
      duplicateProducts: 0
    };
  } catch (error) {
    console.error("Lỗi khi kiểm tra:", error);
    return {
      totalProducts: 0,
      uniqueImages: 0,
      duplicateImages: 0,
      duplicateProducts: 0
    };
  }
}

// Chạy script
cleanupDuplicateImages();
