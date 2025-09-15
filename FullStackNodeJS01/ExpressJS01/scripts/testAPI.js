// scripts/testAPI.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const testAPI = async () => {
  console.log('🧪 Testing API endpoints...\n');

  const tests = [
    {
      name: 'Test Products List',
      url: `${API_BASE_URL}/products`,
      method: 'GET'
    },
    {
      name: 'Test Products with Pagination',
      url: `${API_BASE_URL}/products?page=1&limit=5`,
      method: 'GET'
    },
    {
      name: 'Test Products Search',
      url: `${API_BASE_URL}/products?keyword=iPhone`,
      method: 'GET'
    },
    {
      name: 'Test Products Categories',
      url: `${API_BASE_URL}/products/categories`,
      method: 'GET'
    },
    {
      name: 'Test Products Tags',
      url: `${API_BASE_URL}/products/tags`,
      method: 'GET'
    },
    {
      name: 'Test Search Suggestions',
      url: `${API_BASE_URL}/products/suggestions?keyword=cao`,
      method: 'GET'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      const response = await axios.get(test.url);
      console.log(`✅ Status: ${response.status}`);
      console.log(`📊 Data: ${JSON.stringify(response.data, null, 2).substring(0, 200)}...`);
      console.log('---\n');
    } catch (error) {
      console.log(`❌ Error: ${test.name}`);
      console.log(`Status: ${error.response?.status || 'No response'}`);
      console.log(`Message: ${error.message}`);
      if (error.response?.data) {
        console.log(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      console.log('---\n');
    }
  }
};

// Test với các tham số khác nhau
const testAdvancedFilters = async () => {
  console.log('🔍 Testing Advanced Filters...\n');

  const filterTests = [
    {
      name: 'Price Range Filter',
      url: `${API_BASE_URL}/products?minPrice=1000000&maxPrice=5000000`
    },
    {
      name: 'On Sale Filter',
      url: `${API_BASE_URL}/products?onSale=true`
    },
    {
      name: 'Views Range Filter',
      url: `${API_BASE_URL}/products?minViews=100&maxViews=500`
    },
    {
      name: 'In Stock Filter',
      url: `${API_BASE_URL}/products?inStock=true`
    },
    {
      name: 'Tags Filter',
      url: `${API_BASE_URL}/products?tags=cao cấp`
    },
    {
      name: 'Complex Filter',
      url: `${API_BASE_URL}/products?keyword=iPhone&minPrice=2000000&onSale=true&sortBy=priceAsc`
    }
  ];

  for (const test of filterTests) {
    try {
      console.log(`Testing: ${test.name}`);
      const response = await axios.get(test.url);
      console.log(`✅ Status: ${response.status}`);
      console.log(`Results: ${response.data.products?.length || 0} products found`);
      console.log(`Pagination: Page ${response.data.pagination?.currentPage || 'N/A'}/${response.data.pagination?.totalPages || 'N/A'}`);
      console.log('---\n');
    } catch (error) {
      console.log(`❌ Error: ${test.name}`);
      console.log(`Status: ${error.response?.status || 'No response'}`);
      console.log(`Message: ${error.message}`);
      console.log('---\n');
    }
  }
};

// Chạy tests
const runTests = async () => {
  try {
    await testAPI();
    await testAdvancedFilters();
    console.log('🎉 All tests completed!');
  } catch (error) {
    console.error('💥 Test runner error:', error.message);
  }
};

runTests();
