// scripts/checkDuplicateImages.js
import mongoose from "mongoose";
import Product from "../src/models/product.js";
import { connectDB } from "../src/config/db.js";

async function checkDuplicateImages() {
  try {
    await connectDB();
    console.log("🔍 Đang kiểm tra hình ảnh trùng lặp...");

    // Lấy tất cả sản phẩm với hình ảnh
    const products = await Product.find({ 
      isActive: true,
      images: { $exists: true, $ne: [] }
    }).select('name images');

    console.log(`📊 Tổng số sản phẩm có hình ảnh: ${products.length}`);

    // Tạo map để theo dõi hình ảnh trùng lặp
    const imageMap = new Map();
    const duplicateImages = [];
    const duplicateProducts = [];

    products.forEach(product => {
      product.images.forEach(image => {
        if (image.url) {
          if (imageMap.has(image.url)) {
            // Hình ảnh đã tồn tại
            const existingProduct = imageMap.get(image.url);
            duplicateImages.push({
              url: image.url,
              alt: image.alt,
              products: [existingProduct, product.name]
            });
            
            if (!duplicateProducts.includes(existingProduct)) {
              duplicateProducts.push(existingProduct);
            }
            if (!duplicateProducts.includes(product.name)) {
              duplicateProducts.push(product.name);
            }
          } else {
            // Hình ảnh mới
            imageMap.set(image.url, product.name);
          }
        }
      });
    });

    console.log(`\n📈 Kết quả kiểm tra:`);
    console.log(`- Tổng số hình ảnh duy nhất: ${imageMap.size}`);
    console.log(`- Số hình ảnh trùng lặp: ${duplicateImages.length}`);
    console.log(`- Số sản phẩm có hình ảnh trùng lặp: ${duplicateProducts.length}`);

    if (duplicateImages.length > 0) {
      console.log(`\n🚨 Danh sách hình ảnh trùng lặp:`);
      duplicateImages.forEach((dup, index) => {
        console.log(`${index + 1}. ${dup.url}`);
        console.log(`   Sản phẩm: ${dup.products.join(', ')}`);
        console.log(`   Alt text: ${dup.alt || 'Không có'}`);
        console.log('');
      });

      console.log(`\n📋 Danh sách sản phẩm có hình ảnh trùng lặp:`);
      duplicateProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product}`);
      });
    } else {
      console.log(`\n✅ Không có hình ảnh trùng lặp!`);
    }

    // Kiểm tra phân trang
    console.log(`\n🔍 Kiểm tra phân trang...`);
    const pageSize = 10;
    const totalPages = Math.ceil(products.length / pageSize);
    
    for (let page = 1; page <= Math.min(3, totalPages); page++) {
      const skip = (page - 1) * pageSize;
      const pageProducts = products.slice(skip, skip + pageSize);
      
      console.log(`\n📄 Trang ${page}:`);
      console.log(`- Số sản phẩm: ${pageProducts.length}`);
      
      const pageImages = new Set();
      pageProducts.forEach(product => {
        product.images.forEach(image => {
          if (image.url) {
            pageImages.add(image.url);
          }
        });
      });
      
      console.log(`- Số hình ảnh duy nhất: ${pageImages.size}`);
      console.log(`- Tỷ lệ trùng lặp: ${((pageProducts.reduce((sum, p) => sum + p.images.length, 0) - pageImages.size) / pageProducts.reduce((sum, p) => sum + p.images.length, 0) * 100).toFixed(2)}%`);
    }

  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Đã ngắt kết nối database");
  }
}

// Chạy script
checkDuplicateImages();
