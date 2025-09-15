// scripts/seedData.js
import mongoose from "mongoose";
import Category from "../src/models/category.js";
import Product from "../src/models/product.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fullstack-app");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedCategories = async () => {
  const categories = [
    {
      name: "Điện thoại",
      slug: "dien-thoai",
      description: "Các loại điện thoại thông minh",
    },
    {
      name: "Laptop",
      slug: "laptop",
      description: "Máy tính xách tay",
    },
    {
      name: "Phụ kiện",
      slug: "phu-kien",
      description: "Phụ kiện điện tử",
    },
    {
      name: "Đồng hồ",
      slug: "dong-ho",
      description: "Đồng hồ thông minh và đồng hồ đeo tay",
    },
    {
      name: "Tai nghe",
      slug: "tai-nghe",
      description: "Tai nghe và loa",
    },
  ];

  await Category.deleteMany({});
  const createdCategories = await Category.insertMany(categories);
  console.log("Categories seeded:", createdCategories.length);
  return createdCategories;
};

const seedProducts = async (categories) => {
  const products = [];
  
  // Danh sách từ khóa để tạo tên sản phẩm đa dạng
  const productTypes = {
    "Điện thoại": ["iPhone", "Samsung Galaxy", "Xiaomi", "Oppo", "Vivo", "Huawei", "OnePlus"],
    "Laptop": ["MacBook", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"],
    "Phụ kiện": ["Sạc", "Cáp", "Ốp lưng", "Tai nghe", "Pin dự phòng", "Adapter"],
    "Đồng hồ": ["Apple Watch", "Samsung Watch", "Garmin", "Fitbit", "Casio", "Rolex"],
    "Tai nghe": ["AirPods", "Sony", "Bose", "JBL", "Sennheiser", "Audio-Technica"]
  };

  const adjectives = ["Cao cấp", "Thông minh", "Hiện đại", "Tiện lợi", "Chất lượng", "Bền bỉ", "Nhanh", "Mạnh mẽ"];
  const features = ["Bluetooth", "Wireless", "Waterproof", "Fast Charging", "HD", "4K", "Smart", "AI"];
  
  // Tạo 100 sản phẩm mẫu với dữ liệu đa dạng hơn
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryName = category.name;
    const productTypesForCategory = productTypes[categoryName] || ["Sản phẩm"];
    const productType = productTypesForCategory[Math.floor(Math.random() * productTypesForCategory.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const feature = features[Math.floor(Math.random() * features.length)];
    
    const isOnSale = Math.random() > 0.6; // 40% sản phẩm có khuyến mãi
    const basePrice = Math.floor(Math.random() * 15000000) + 500000; // 500K - 15.5M
    
    const product = {
      name: `${adjective} ${productType} ${i} - ${feature}`,
      slug: `${adjective.toLowerCase()}-${productType.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      category: category._id,
      description: `Sản phẩm ${productType} ${adjective.toLowerCase()} với tính năng ${feature}. Đây là một sản phẩm chất lượng cao, phù hợp cho mọi nhu cầu sử dụng. Thiết kế hiện đại và công nghệ tiên tiến.`,
      price: {
        base: basePrice,
        sale: isOnSale ? Math.floor(basePrice * (0.7 + Math.random() * 0.2)) : null, // Giảm 10-30%
      },
      stock: Math.floor(Math.random() * 200) + 1,
      images: [
        {
          url: `https://picsum.photos/300/200?random=${i}`,
          alt: `${adjective} ${productType} ${i}`,
        },
      ],
      views: Math.floor(Math.random() * 2000) + 10,
      tags: [
        adjective.toLowerCase(),
        productType.toLowerCase().replace(/\s+/g, '-'),
        feature.toLowerCase(),
        category.slug,
        "phổ biến",
        "chất lượng",
        "hiện đại"
      ].filter((tag, index, arr) => arr.indexOf(tag) === index), // Loại bỏ duplicate
      isActive: true,
    };
    
    products.push(product);
  }

  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(products);
  console.log("Products seeded:", createdProducts.length);
  return createdProducts;
};

const seedData = async () => {
  try {
    await connectDB();
    
    console.log("Starting to seed data...");
    
    const categories = await seedCategories();
    const products = await seedProducts(categories);
    
    console.log("Data seeding completed successfully!");
    console.log(`Created ${categories.length} categories and ${products.length} products`);
    
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedData();
