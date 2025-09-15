# Hướng dẫn Test Chức năng Phân trang Sản phẩm

## Các tính năng đã implement:

### Backend (ExpressJS):
1. **API phân trang**: `/api/products` với các tham số:
   - `page`: Số trang (mặc định: 1)
   - `limit`: Số sản phẩm mỗi trang (mặc định: 10)
   - `keyword`: Tìm kiếm theo tên sản phẩm
   - `category`: Lọc theo danh mục
   - `minPrice`, `maxPrice`: Lọc theo giá
   - `onSale`: Lọc sản phẩm đang khuyến mãi
   - `sortBy`: Sắp xếp (newest, views, priceAsc, priceDesc)

2. **Response format**:
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Frontend (React):
1. **Trang ProductsPage**: `/products`
2. **Tính năng**:
   - Hiển thị danh sách sản phẩm dạng grid
   - Bộ lọc tìm kiếm và sắp xếp
   - Phân trang với navigation
   - Responsive design
   - Loading state

## Cách test:

### 1. Chuẩn bị dữ liệu:
```bash
cd ExpressJS01
npm run seed
```

### 2. Chạy backend:
```bash
cd ExpressJS01
npm run dev
```

### 3. Chạy frontend:
```bash
cd ReactJS01/fullstack-client
npm run dev
```

### 4. Test các tính năng:

#### a) Phân trang cơ bản:
- Truy cập `/products`
- Kiểm tra hiển thị 10 sản phẩm đầu tiên
- Click nút "Sau" để chuyển trang
- Click nút "Trước" để quay lại

#### b) Thay đổi số sản phẩm mỗi trang:
- Chọn "Số sản phẩm/trang" khác nhau (5, 10, 20, 50)
- Kiểm tra số trang thay đổi tương ứng

#### c) Tìm kiếm:
- Nhập từ khóa vào ô "Tìm kiếm"
- Kiểm tra kết quả được lọc

#### d) Sắp xếp:
- Thay đổi "Sắp xếp" (Mới nhất, Xem nhiều nhất, Giá tăng/giảm dần)
- Kiểm tra thứ tự sản phẩm thay đổi

#### e) Lọc theo giá:
- Nhập giá tối thiểu và tối đa
- Kiểm tra chỉ hiển thị sản phẩm trong khoảng giá

#### f) Lọc sản phẩm khuyến mãi:
- Tick vào "Đang khuyến mãi"
- Kiểm tra chỉ hiển thị sản phẩm có giá sale

#### g) Responsive:
- Thay đổi kích thước màn hình
- Kiểm tra layout thích ứng

### 5. Test API trực tiếp:

#### Lấy trang đầu tiên:
```bash
curl "http://localhost:5000/api/products?page=1&limit=5"
```

#### Tìm kiếm:
```bash
curl "http://localhost:5000/api/products?keyword=điện thoại&page=1&limit=10"
```

#### Lọc theo giá:
```bash
curl "http://localhost:5000/api/products?minPrice=1000000&maxPrice=5000000&page=1&limit=10"
```

#### Sắp xếp:
```bash
curl "http://localhost:5000/api/products?sortBy=priceAsc&page=1&limit=10"
```

## Kết quả mong đợi:

1. **Backend**: API trả về đúng cấu trúc với thông tin phân trang
2. **Frontend**: UI hiển thị đẹp, responsive, các tính năng hoạt động mượt mà
3. **Performance**: Phân trang giúp tải nhanh hơn với dataset lớn
4. **UX**: Người dùng có thể dễ dàng điều hướng và tìm kiếm sản phẩm

## Lưu ý:
- Đảm bảo MongoDB đang chạy
- Kiểm tra kết nối database trong `src/config/db.js`
- Nếu có lỗi, kiểm tra console log của cả backend và frontend
