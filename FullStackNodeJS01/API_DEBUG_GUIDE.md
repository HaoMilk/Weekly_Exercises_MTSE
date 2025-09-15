# 🔧 Hướng dẫn Debug và Sửa lỗi API

## 🚨 Các lỗi phổ biến và cách khắc phục:

### 1. **Lỗi Database Connection**

#### **Triệu chứng**:
```
❌ MongoDB connection failed
Error: connect ECONNREFUSED 127.0.0.1:27017
```

#### **Nguyên nhân**:
- MongoDB chưa được cài đặt hoặc chưa chạy
- Thiếu file `.env` với MONGO_URI

#### **Cách khắc phục**:

1. **Cài đặt MongoDB**:
```bash
# Windows (với Chocolatey)
choco install mongodb

# Hoặc download từ: https://www.mongodb.com/try/download/community
```

2. **Khởi động MongoDB**:
```bash
# Windows
net start MongoDB

# Hoặc chạy mongod.exe từ thư mục cài đặt
```

3. **Tạo file .env**:
```bash
# Tạo file .env trong thư mục ExpressJS01
MONGO_URI=mongodb://localhost:27017/fullstack-app
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

### 2. **Lỗi Module Not Found**

#### **Triệu chứng**:
```
Error: Cannot find module 'axios'
Error: Cannot find module 'mongoose'
```

#### **Cách khắc phục**:
```bash
cd ExpressJS01
npm install
```

### 3. **Lỗi API Endpoints**

#### **Triệu chứng**:
```
404 Not Found
Cannot GET /api/products/categories
```

#### **Nguyên nhân**:
- Server chưa chạy
- Routes không được đăng ký đúng

#### **Cách khắc phục**:

1. **Kiểm tra server đang chạy**:
```bash
cd ExpressJS01
npm run dev
```

2. **Kiểm tra routes trong server.js**:
```javascript
app.use("/api/products", productRoutes);
```

### 4. **Lỗi Fuzzy Search**

#### **Triệu chứng**:
```
MongoError: $or/$and/$nor must be a nonempty array
```

#### **Nguyên nhân**:
- Logic tìm kiếm có lỗi trong service

#### **Đã sửa**:
- Loại bỏ text search không cần thiết
- Sửa regex pattern cho tags

### 5. **Lỗi Frontend API Calls**

#### **Triệu chứng**:
```
Network Error
CORS error
```

#### **Cách khắc phục**:

1. **Kiểm tra CORS**:
```javascript
// server.js
app.use(cors());
```

2. **Kiểm tra baseURL**:
```javascript
// axiosInstance.js
baseURL: "http://localhost:5000/api"
```

## 🧪 Cách Test API:

### 1. **Chuẩn bị dữ liệu**:
```bash
cd ExpressJS01
npm run seed
```

### 2. **Chạy server**:
```bash
npm run dev
```

### 3. **Test API**:
```bash
npm run test-api
```

### 4. **Test thủ công**:

#### **Test cơ bản**:
```bash
curl http://localhost:5000/api/products
```

#### **Test với filters**:
```bash
curl "http://localhost:5000/api/products?keyword=iPhone&page=1&limit=5"
```

#### **Test categories**:
```bash
curl http://localhost:5000/api/products/categories
```

#### **Test suggestions**:
```bash
curl "http://localhost:5000/api/products/suggestions?keyword=cao"
```

## 🔍 Debug Steps:

### 1. **Kiểm tra Server Logs**:
```bash
cd ExpressJS01
npm run dev
# Xem console logs để phát hiện lỗi
```

### 2. **Kiểm tra Database**:
```bash
# Kết nối MongoDB
mongosh
use fullstack-app
db.products.find().limit(5)
db.categories.find()
```

### 3. **Kiểm tra Network**:
- Mở Developer Tools (F12)
- Tab Network để xem API calls
- Kiểm tra status codes và response

### 4. **Test từng endpoint**:
```bash
# Test từng API endpoint riêng biệt
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/categories
curl http://localhost:5000/api/products/tags
curl http://localhost:5000/api/products/suggestions?keyword=test
```

## 🛠️ Common Fixes:

### 1. **Sửa lỗi Import**:
```javascript
// Đảm bảo import đúng
import Product from "../models/product.js"; // .js extension
```

### 2. **Sửa lỗi Async/Await**:
```javascript
// Luôn sử dụng try-catch với async
try {
  const result = await someAsyncFunction();
} catch (error) {
  console.error(error);
}
```

### 3. **Sửa lỗi Mongoose**:
```javascript
// Đảm bảo schema đúng
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
```

## 📋 Checklist Debug:

- [ ] MongoDB đang chạy
- [ ] File .env tồn tại và đúng
- [ ] npm install đã chạy
- [ ] Server đang chạy trên port 5000
- [ ] Database có dữ liệu (chạy seed)
- [ ] CORS được enable
- [ ] Routes được đăng ký đúng
- [ ] Frontend baseURL đúng

## 🆘 Nếu vẫn có lỗi:

1. **Xóa node_modules và reinstall**:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Kiểm tra version Node.js**:
```bash
node --version
# Nên dùng Node.js 16+ 
```

3. **Kiểm tra logs chi tiết**:
```bash
# Thêm debug logs vào code
console.log('Debug:', data);
```

4. **Test với Postman**:
- Import collection
- Test từng endpoint
- Kiểm tra headers và body
