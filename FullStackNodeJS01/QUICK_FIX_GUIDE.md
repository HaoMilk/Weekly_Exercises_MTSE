# 🚨 Sửa lỗi API - Hướng dẫn nhanh

## ⚡ Các bước sửa lỗi nhanh:

### 1. **Kiểm tra MongoDB**
```bash
# Kiểm tra MongoDB có chạy không
mongosh
# Nếu không kết nối được, khởi động MongoDB
```

### 2. **Tạo file .env**
Tạo file `.env` trong thư mục `ExpressJS01` với nội dung:
```
MONGO_URI=mongodb://localhost:27017/fullstack-app
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

### 3. **Cài đặt dependencies**
```bash
cd ExpressJS01
npm install
```

### 4. **Chạy seed data**
```bash
npm run seed
```

### 5. **Khởi động server**
```bash
npm run dev
```

### 6. **Test API**
```bash
# Test cơ bản
curl http://localhost:5000/api/products

# Test với filters
curl "http://localhost:5000/api/products?keyword=iPhone&page=1&limit=5"
```

## 🔧 Các lỗi đã được sửa:

### ✅ **Fuzzy Search Logic**
- Sửa lỗi regex pattern trong tags search
- Loại bỏ text search không cần thiết
- Đơn giản hóa logic tìm kiếm

### ✅ **Search Suggestions**
- Sửa lỗi aggregation pipeline
- Đơn giản hóa query để tránh lỗi MongoDB

### ✅ **Relevance Sorting**
- Loại bỏ text score phức tạp
- Sử dụng createdAt sorting đơn giản

### ✅ **Error Handling**
- Thêm try-catch cho tất cả async functions
- Cải thiện error messages

## 🧪 Test Scripts:

### **Test đơn giản**:
```bash
cd ExpressJS01
node scripts/simpleTest.js
```

### **Test với axios**:
```bash
npm run test-api
```

## 📋 Checklist Debug:

- [ ] MongoDB đang chạy
- [ ] File .env tồn tại
- [ ] npm install đã chạy
- [ ] npm run seed đã chạy
- [ ] Server chạy trên port 5000
- [ ] API endpoints trả về data

## 🆘 Nếu vẫn lỗi:

1. **Kiểm tra logs server**:
```bash
npm run dev
# Xem console logs
```

2. **Kiểm tra database**:
```bash
mongosh
use fullstack-app
db.products.count()
db.categories.count()
```

3. **Test từng endpoint**:
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/categories
curl http://localhost:5000/api/products/tags
```

4. **Kiểm tra frontend**:
```bash
cd ReactJS01/fullstack-client
npm run dev
# Mở http://localhost:3000/products
```

## 🎯 Kết quả mong đợi:

- ✅ Server chạy không lỗi
- ✅ API trả về data đúng format
- ✅ Frontend load được sản phẩm
- ✅ Search và filter hoạt động
- ✅ Pagination hoạt động
