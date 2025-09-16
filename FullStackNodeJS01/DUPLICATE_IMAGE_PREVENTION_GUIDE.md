# Hướng dẫn Đảm bảo Không có Hình ảnh Trùng lặp trong Phân trang

## Tổng quan

Hệ thống đã được cải thiện để đảm bảo rằng khi phân trang, các hình ảnh từ trang trước không lặp lại ở trang sau. Điều này được thực hiện thông qua nhiều lớp bảo vệ:

## 1. Database Level (MongoDB)

### Model Product được cải thiện:
- **Validation URL hình ảnh**: Kiểm tra định dạng URL hợp lệ
- **Middleware pre-save**: Tự động kiểm tra hình ảnh trùng lặp khi lưu
- **Middleware pre-update**: Kiểm tra hình ảnh trùng lặp khi cập nhật
- **Tự động đặt hình ảnh chính**: Đảm bảo có ít nhất một hình ảnh chính

### Cấu trúc hình ảnh mới:
```javascript
images: [
  {
    url: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(v);
        },
        message: 'URL hình ảnh không hợp lệ'
      }
    },
    alt: {
      type: String,
      default: function() {
        return this.parent().name || 'Product image';
      }
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }
]
```

## 2. Service Level

### Các hàm mới được thêm:

#### `cleanDuplicateImages()`
- Tìm và loại bỏ hình ảnh trùng lặp
- Cập nhật database tự động
- Trả về báo cáo chi tiết

#### `validatePaginationConsistency(pageSize, maxPages)`
- Kiểm tra tính nhất quán của phân trang
- Phát hiện hình ảnh trùng lặp giữa các trang
- Trả về thống kê chi tiết

## 3. API Endpoints

### GET `/api/products/validate-pagination`
Kiểm tra tính nhất quán của phân trang:
```bash
curl "http://localhost:3000/api/products/validate-pagination?pageSize=10&maxPages=5"
```

### POST `/api/products/clean-duplicates`
Làm sạch hình ảnh trùng lặp:
```bash
curl -X POST "http://localhost:3000/api/products/clean-duplicates"
```

## 4. Frontend Level (React)

### Image Cache System
- **Cache hình ảnh**: Sử dụng `Set` để theo dõi hình ảnh đã hiển thị
- **Reset cache**: Tự động reset khi chuyển trang
- **Lọc trùng lặp**: Loại bỏ hình ảnh trùng lặp trước khi hiển thị

### Cải thiện hiển thị:
- **Hình ảnh chính**: Ưu tiên hiển thị hình ảnh được đánh dấu `isPrimary`
- **Fallback**: Xử lý lỗi hình ảnh một cách graceful
- **Error handling**: Ẩn hình ảnh lỗi và hiển thị placeholder

## 5. Scripts và Tools

### `scripts/checkDuplicateImages.js`
Kiểm tra hình ảnh trùng lặp hiện tại:
```bash
node scripts/checkDuplicateImages.js
```

### `scripts/cleanupDuplicateImages.js`
Làm sạch hình ảnh trùng lặp:
```bash
node scripts/cleanupDuplicateImages.js
```

### `scripts/testPaginationConsistency.js`
Test tính nhất quán của phân trang:
```bash
node scripts/testPaginationConsistency.js
```

## 6. Cách sử dụng

### Kiểm tra hệ thống:
1. Chạy script kiểm tra:
   ```bash
   node scripts/testPaginationConsistency.js
   ```

2. Kiểm tra qua API:
   ```bash
   curl "http://localhost:3000/api/products/validate-pagination"
   ```

### Làm sạch dữ liệu:
1. Chạy script làm sạch:
   ```bash
   node scripts/cleanupDuplicateImages.js
   ```

2. Hoặc sử dụng API:
   ```bash
   curl -X POST "http://localhost:3000/api/products/clean-duplicates"
   ```

## 7. Kết quả mong đợi

### Khi hệ thống hoạt động đúng:
- ✅ Không có hình ảnh trùng lặp giữa các trang
- ✅ Mỗi sản phẩm có hình ảnh duy nhất
- ✅ Phân trang hoạt động nhất quán
- ✅ Frontend hiển thị hình ảnh chính xác

### Thống kê mẫu:
```
📊 Test với pageSize = 10:
- Tổng số sản phẩm: 20
- Tổng số trang: 2
- Số sản phẩm duy nhất: 20
- Số hình ảnh duy nhất: 20
- Số hình ảnh trùng lặp trong phân trang: 0
✅ Phân trang hoạt động chính xác!
```

## 8. Troubleshooting

### Nếu vẫn có hình ảnh trùng lặp:
1. Kiểm tra middleware trong model Product
2. Chạy script làm sạch
3. Kiểm tra frontend cache
4. Xem logs của API

### Debug:
- Sử dụng `scripts/testPaginationConsistency.js` để debug
- Kiểm tra response của API `/validate-pagination`
- Xem console logs trong frontend

## 9. Best Practices

1. **Luôn validate hình ảnh** trước khi lưu vào database
2. **Sử dụng hình ảnh chính** (`isPrimary: true`) cho mỗi sản phẩm
3. **Reset cache** khi chuyển trang trong frontend
4. **Kiểm tra định kỳ** bằng các script tools
5. **Monitor API logs** để phát hiện vấn đề sớm

---

Hệ thống này đảm bảo rằng người dùng sẽ không bao giờ thấy hình ảnh trùng lặp khi duyệt qua các trang sản phẩm khác nhau.
