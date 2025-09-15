// scripts/simpleTest.js
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

const testEndpoint = async (name, url) => {
  try {
    console.log(`🧪 Testing: ${name}`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Status: ${response.status}`);
      console.log(`📊 Results: ${data.products?.length || data.length || 'N/A'} items`);
      if (data.pagination) {
        console.log(`📄 Pagination: Page ${data.pagination.currentPage}/${data.pagination.totalPages}`);
      }
    } else {
      console.log(`❌ Status: ${response.status}`);
      console.log(`Error: ${data.message || data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
  }
  console.log('---');
};

const runTests = async () => {
  console.log('🚀 Starting API Tests...\n');
  
  const tests = [
    ['Products List', `${API_BASE_URL}/products`],
    ['Products with Pagination', `${API_BASE_URL}/products?page=1&limit=5`],
    ['Products Search', `${API_BASE_URL}/products?keyword=iPhone`],
    ['Products Categories', `${API_BASE_URL}/products/categories`],
    ['Products Tags', `${API_BASE_URL}/products/tags`],
    ['Search Suggestions', `${API_BASE_URL}/products/suggestions?keyword=cao`],
    ['Price Filter', `${API_BASE_URL}/products?minPrice=1000000&maxPrice=5000000`],
    ['On Sale Filter', `${API_BASE_URL}/products?onSale=true`],
    ['Complex Filter', `${API_BASE_URL}/products?keyword=cao cấp&minPrice=2000000&sortBy=priceAsc`]
  ];

  for (const [name, url] of tests) {
    await testEndpoint(name, url);
  }
  
  console.log('🎉 All tests completed!');
};

runTests().catch(console.error);
