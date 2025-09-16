// scripts/testDuplicateImageAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

async function testDuplicateImageAPI() {
  try {
    console.log("🧪 Bắt đầu test API quản lý hình ảnh trùng lặp...");

    // Test 1: Kiểm tra phân trang
    console.log("\n📄 Test 1: Kiểm tra phân trang");
    const paginationResponse = await axios.get(`${API_BASE_URL}/products/validate-pagination?pageSize=5&maxPages=3`);
    console.log("✅ Kết quả kiểm tra phân trang:", paginationResponse.data);

    // Test 2: Làm sạch hình ảnh trùng lặp
    console.log("\n🧹 Test 2: Làm sạch hình ảnh trùng lặp");
    const cleanResponse = await axios.post(`${API_BASE_URL}/products/clean-duplicates`);
    console.log("✅ Kết quả làm sạch:", cleanResponse.data);

    // Test 3: Kiểm tra lại phân trang sau khi làm sạch
    console.log("\n🔍 Test 3: Kiểm tra lại phân trang sau khi làm sạch");
    const recheckResponse = await axios.get(`${API_BASE_URL}/products/validate-pagination?pageSize=5&maxPages=3`);
    console.log("✅ Kết quả kiểm tra lại:", recheckResponse.data);

    // Test 4: Test phân trang thực tế
    console.log("\n📊 Test 4: Test phân trang thực tế");
    for (let page = 1; page <= 3; page++) {
      const productsResponse = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=5`);
      const products = productsResponse.data.products;
      
      console.log(`\n📄 Trang ${page}:`);
      console.log(`- Số sản phẩm: ${products.length}`);
      
      const imageUrls = new Set();
      products.forEach(product => {
        if (product.images && product.images.length > 0) {
          product.images.forEach(image => {
            if (image.url) {
              imageUrls.add(image.url);
            }
          });
        }
      });
      
      console.log(`- Số hình ảnh duy nhất: ${imageUrls.size}`);
      console.log(`- Tỷ lệ trùng lặp: ${((products.reduce((sum, p) => sum + (p.images?.length || 0), 0) - imageUrls.size) / products.reduce((sum, p) => sum + (p.images?.length || 0), 0) * 100).toFixed(2)}%`);
    }

    console.log("\n🎉 Hoàn thành test API!");

  } catch (error) {
    console.error("❌ Lỗi trong quá trình test:", error.response?.data || error.message);
  }
}

// Chạy test
testDuplicateImageAPI();
