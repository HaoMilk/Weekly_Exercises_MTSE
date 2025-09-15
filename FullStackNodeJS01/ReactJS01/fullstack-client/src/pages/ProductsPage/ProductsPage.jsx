import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axiosInstance";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    onSale: "",
    minViews: "",
    maxViews: "",
    tags: "",
    inStock: "",
    sortBy: "newest",
    page: 1,
    limit: 10,
  });

  // Debounce function để tránh gọi API quá nhiều
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Load categories và tags khi component mount
  useEffect(() => {
    const loadCategoriesAndTags = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          axios.get("/products/categories"),
          axios.get("/products/tags")
        ]);
        setCategories(categoriesRes.data);
        setPopularTags(tagsRes.data);
      } catch (error) {
        console.error("Error loading categories and tags:", error);
      }
    };
    loadCategoriesAndTags();
  }, []);

  // Debounced search suggestions
  const debouncedSearchSuggestions = useCallback(
    debounce(async (keyword) => {
      if (keyword.length >= 2) {
        try {
          const response = await axios.get(`/products/suggestions?keyword=${encodeURIComponent(keyword)}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    [debounce]
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      const response = await axios.get(`/products?${params.toString()}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Handle keyword change với suggestions
  const handleKeywordChange = (value) => {
    setFilters(prev => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
    
    if (value.length >= 2) {
      debouncedSearchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFilters(prev => ({
      ...prev,
      keyword: suggestion.name,
      page: 1,
    }));
    setShowSuggestions(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  };

  const handleLimitChange = (limit) => {
    setFilters(prev => ({
      ...prev,
      limit: parseInt(limit),
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      onSale: "",
      minViews: "",
      maxViews: "",
      tags: "",
      inStock: "",
      sortBy: "newest",
      page: 1,
      limit: 10,
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${i === pagination.currentPage ? styles.active : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
        >
          Trước
        </button>
        {startPage > 1 && (
          <>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className={styles.ellipsis}>...</span>}
          </>
        )}
        {pages}
        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && <span className={styles.ellipsis}>...</span>}
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(pagination.totalPages)}
            >
              {pagination.totalPages}
            </button>
          </>
        )}
        <button
          className={styles.pageBtn}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          Sau
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tìm kiếm và Lọc Sản phẩm</h1>

      {/* Advanced Search */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm với Fuzzy Search..."
              value={filters.keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={styles.searchInput}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className={styles.suggestionName}>{suggestion.name}</span>
                    {suggestion.tags && suggestion.tags.length > 0 && (
                      <span className={styles.suggestionTags}>
                        {suggestion.tags.slice(0, 2).join(", ")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>Danh mục:</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sắp xếp:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="views">Xem nhiều nhất</option>
              <option value="viewsAsc">Xem ít nhất</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
              <option value="nameAsc">Tên A-Z</option>
              <option value="nameDesc">Tên Z-A</option>
              <option value="stockAsc">Tồn kho tăng dần</option>
              <option value="stockDesc">Tồn kho giảm dần</option>
              <option value="relevance">Độ phù hợp</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Số sản phẩm/trang:</label>
            <select
              value={filters.limit}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>Giá từ:</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Giá đến:</label>
            <input
              type="number"
              placeholder="10000000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Lượt xem từ:</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minViews}
              onChange={(e) => handleFilterChange("minViews", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Lượt xem đến:</label>
            <input
              type="number"
              placeholder="1000"
              value={filters.maxViews}
              onChange={(e) => handleFilterChange("maxViews", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>
              <input
                type="checkbox"
                checked={filters.onSale === "true"}
                onChange={(e) => handleFilterChange("onSale", e.target.checked ? "true" : "")}
              />
              Đang khuyến mãi
            </label>
          </div>

          <div className={styles.filterGroup}>
            <label>
              <input
                type="checkbox"
                checked={filters.inStock === "true"}
                onChange={(e) => handleFilterChange("inStock", e.target.checked ? "true" : "")}
              />
              Còn hàng
            </label>
          </div>

          <div className={styles.filterGroup}>
            <label>Tags:</label>
            <input
              type="text"
              placeholder="Nhập tags cách nhau bởi dấu phẩy"
              value={filters.tags}
              onChange={(e) => handleFilterChange("tags", e.target.value)}
            />
          </div>

          <button className={styles.clearBtn} onClick={clearFilters}>
            Xóa bộ lọc
          </button>
        </div>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <div className={styles.popularTags}>
            <label>Tags phổ biến:</label>
            <div className={styles.tagList}>
              {popularTags.slice(0, 10).map((tag, index) => (
                <button
                  key={index}
                  className={styles.tagBtn}
                  onClick={() => handleFilterChange("tags", tag.name)}
                >
                  {tag.name} ({tag.count})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results info */}
      <div className={styles.resultsInfo}>
        <p>
          Hiển thị {products.length} trong tổng số {pagination.totalProducts} sản phẩm
          (Trang {pagination.currentPage}/{pagination.totalPages})
        </p>
        {filters.keyword && (
          <p className={styles.searchInfo}>
            Kết quả tìm kiếm cho: <strong>"{filters.keyword}"</strong>
          </p>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className={styles.loading}>Đang tải...</div>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productImage}>
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0].url} alt={product.images[0].alt || product.name} />
                ) : (
                  <div className={styles.noImage}>Không có hình ảnh</div>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productCategory}>
                  Danh mục: {product.category?.name || "Chưa phân loại"}
                </div>
                <div className={styles.productPrice}>
                  {product.price.sale ? (
                    <>
                      <span className={styles.salePrice}>{formatPrice(product.price.sale)}</span>
                      <span className={styles.originalPrice}>{formatPrice(product.price.base)}</span>
                    </>
                  ) : (
                    <span className={styles.normalPrice}>{formatPrice(product.price.base)}</span>
                  )}
                </div>
                <div className={styles.productStock}>
                  Còn lại: {product.stock} sản phẩm
                </div>
                <div className={styles.productViews}>
                  Lượt xem: {product.views}
                </div>
                {product.tags && product.tags.length > 0 && (
                  <div className={styles.productTags}>
                    Tags: {product.tags.slice(0, 3).join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && renderPagination()}
    </div>
  );
}
