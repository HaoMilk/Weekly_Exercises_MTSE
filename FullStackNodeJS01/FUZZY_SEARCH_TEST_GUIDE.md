# Hướng dẫn Test Chức năng Tìm kiếm Fuzzy Search và Lọc Nâng cao

## 🚀 Các tính năng đã implement:

### Backend (ExpressJS) - Fuzzy Search & Advanced Filtering:

#### 1. **Fuzzy Search nâng cao**:
- **Regex Pattern Matching**: Tìm kiếm với pattern linh hoạt
- **Multi-field Search**: Tìm trong name, description, tags
- **Priority-based Search**: Ưu tiên kết quả chính xác trước
- **Text Index Support**: Hỗ trợ MongoDB text search

#### 2. **Advanced Filtering**:
- **Category Filter**: Lọc theo danh mục (hỗ trợ multiple categories)
- **Price Range**: Lọc theo khoảng giá (minPrice, maxPrice)
- **Sale Status**: Lọc sản phẩm khuyến mãi/không khuyến mãi
- **Views Range**: Lọc theo lượt xem (minViews, maxViews)
- **Tags Filter**: Lọc theo tags (hỗ trợ multiple tags)
- **Stock Status**: Lọc sản phẩm còn hàng/hết hàng

#### 3. **Advanced Sorting**:
- `newest` / `oldest`: Theo thời gian tạo
- `views` / `viewsAsc`: Theo lượt xem
- `priceAsc` / `priceDesc`: Theo giá
- `nameAsc` / `nameDesc`: Theo tên
- `stockAsc` / `stockDesc`: Theo tồn kho
- `relevance`: Theo độ phù hợp (khi có keyword)

#### 4. **New API Endpoints**:
- `GET /api/products/categories` - Lấy danh sách categories với số lượng sản phẩm
- `GET /api/products/tags` - Lấy danh sách tags phổ biến
- `GET /api/products/suggestions?keyword=...` - Tìm kiếm gợi ý

### Frontend (React) - Advanced UI:

#### 1. **Smart Search Box**:
- **Autocomplete**: Gợi ý sản phẩm khi gõ
- **Debounced Search**: Tránh gọi API quá nhiều
- **Real-time Suggestions**: Hiển thị gợi ý ngay lập tức

#### 2. **Advanced Filter Panel**:
- **Category Dropdown**: Với số lượng sản phẩm
- **Price Range Inputs**: Giá từ/đến
- **Views Range Inputs**: Lượt xem từ/đến
- **Checkboxes**: Khuyến mãi, Còn hàng
- **Tags Input**: Nhập tags cách nhau bởi dấu phẩy
- **Popular Tags**: Click để lọc nhanh

#### 3. **Enhanced Product Display**:
- **Tags Display**: Hiển thị tags của sản phẩm
- **Search Info**: Hiển thị từ khóa tìm kiếm
- **Responsive Design**: Tối ưu cho mobile

## 🧪 Cách Test:

### 1. Chuẩn bị dữ liệu:
```bash
cd ExpressJS01
npm run seed
```
*Tạo 100 sản phẩm với dữ liệu đa dạng*

### 2. Chạy ứng dụng:
```bash
# Backend
cd ExpressJS01
npm run dev

# Frontend
cd ReactJS01/fullstack-client
npm run dev
```

### 3. Test Cases:

#### A) **Fuzzy Search Testing**:

1. **Tìm kiếm chính xác**:
   - Gõ: `iPhone` → Tìm sản phẩm có tên chứa "iPhone"
   - Gõ: `Cao cấp` → Tìm sản phẩm có từ "Cao cấp"

2. **Tìm kiếm mờ (Fuzzy)**:
   - Gõ: `iphne` → Vẫn tìm thấy "iPhone"
   - Gõ: `cao cap` → Vẫn tìm thấy "Cao cấp"

3. **Tìm kiếm trong description**:
   - Gõ: `Bluetooth` → Tìm sản phẩm có description chứa "Bluetooth"

4. **Tìm kiếm trong tags**:
   - Gõ: `hiện đại` → Tìm sản phẩm có tag "hiện đại"

#### B) **Autocomplete Testing**:

1. **Gõ từng ký tự**:
   - Gõ: `i` → Hiển thị gợi ý
   - Gõ: `ip` → Gợi ý cập nhật
   - Gõ: `iph` → Gợi ý chính xác hơn

2. **Click gợi ý**:
   - Click vào gợi ý → Tự động điền và tìm kiếm

#### C) **Advanced Filtering Testing**:

1. **Category Filter**:
   ```bash
   # Test API
   curl "http://localhost:5000/api/products?category=CATEGORY_ID"
   ```

2. **Price Range**:
   ```bash
   curl "http://localhost:5000/api/products?minPrice=1000000&maxPrice=5000000"
   ```

3. **Views Range**:
   ```bash
   curl "http://localhost:5000/api/products?minViews=100&maxViews=500"
   ```

4. **Sale Status**:
   ```bash
   curl "http://localhost:5000/api/products?onSale=true"
   ```

5. **Stock Status**:
   ```bash
   curl "http://localhost:5000/api/products?inStock=true"
   ```

6. **Tags Filter**:
   ```bash
   curl "http://localhost:5000/api/products?tags=hiện đại,chất lượng"
   ```

#### D) **Combined Filtering**:

1. **Multiple Filters**:
   ```bash
   curl "http://localhost:5000/api/products?keyword=iPhone&category=CATEGORY_ID&minPrice=2000000&onSale=true&sortBy=priceAsc"
   ```

2. **Complex Search**:
   ```bash
   curl "http://localhost:5000/api/products?keyword=cao cấp&minViews=50&maxViews=200&tags=bluetooth&inStock=true&sortBy=relevance"
   ```

#### E) **Sorting Testing**:

1. **Test các loại sắp xếp**:
   - `sortBy=newest` - Mới nhất
   - `sortBy=priceAsc` - Giá tăng dần
   - `sortBy=views` - Xem nhiều nhất
   - `sortBy=relevance` - Độ phù hợp (cần keyword)

#### F) **API Endpoints Testing**:

1. **Categories API**:
   ```bash
   curl "http://localhost:5000/api/products/categories"
   ```

2. **Tags API**:
   ```bash
   curl "http://localhost:5000/api/products/tags?limit=10"
   ```

3. **Suggestions API**:
   ```bash
   curl "http://localhost:5000/api/products/suggestions?keyword=iphone&limit=5"
   ```

### 4. **UI Testing**:

#### A) **Search Box**:
1. Gõ từ khóa → Kiểm tra autocomplete hiển thị
2. Click gợi ý → Kiểm tra tự động điền và tìm kiếm
3. Gõ từ khóa không có kết quả → Kiểm tra thông báo

#### B) **Filter Panel**:
1. Chọn danh mục → Kiểm tra kết quả được lọc
2. Nhập khoảng giá → Kiểm tra sản phẩm trong khoảng
3. Tick checkbox → Kiểm tra lọc theo điều kiện
4. Click popular tags → Kiểm tra tự động lọc

#### C) **Results Display**:
1. Kiểm tra hiển thị đúng số lượng kết quả
2. Kiểm tra thông tin tìm kiếm hiển thị
3. Kiểm tra tags sản phẩm hiển thị
4. Kiểm tra responsive trên mobile

#### D) **Pagination**:
1. Kiểm tra phân trang hoạt động với filters
2. Thay đổi số sản phẩm/trang
3. Kiểm tra navigation buttons

### 5. **Performance Testing**:

1. **Debounced Search**:
   - Gõ nhanh nhiều ký tự → Kiểm tra không gọi API quá nhiều

2. **Large Dataset**:
   - Test với 100 sản phẩm → Kiểm tra tốc độ tải

3. **Complex Queries**:
   - Kết hợp nhiều filters → Kiểm tra performance

## 🎯 Kết quả mong đợi:

### ✅ **Fuzzy Search**:
- Tìm kiếm chính xác và mờ đều hoạt động
- Kết quả được sắp xếp theo độ phù hợp
- Autocomplete gợi ý chính xác

### ✅ **Advanced Filtering**:
- Tất cả filters hoạt động độc lập và kết hợp
- UI responsive và user-friendly
- Performance tốt với dataset lớn

### ✅ **User Experience**:
- Tìm kiếm nhanh và chính xác
- Interface trực quan và dễ sử dụng
- Loading states và error handling

## 🔧 Troubleshooting:

1. **Không có gợi ý**: Kiểm tra API `/products/suggestions`
2. **Filter không hoạt động**: Kiểm tra console log
3. **Performance chậm**: Kiểm tra database indexes
4. **UI không responsive**: Kiểm tra CSS media queries

## 📊 Test Data:

- **100 sản phẩm** với tên đa dạng
- **5 danh mục** với số lượng sản phẩm khác nhau
- **Nhiều tags** phổ biến
- **Khoảng giá** từ 500K - 15.5M VND
- **Lượt xem** từ 10 - 2000
- **40% sản phẩm** có khuyến mãi
