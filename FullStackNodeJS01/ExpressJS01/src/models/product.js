// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      index: true, // Để hỗ trợ fuzzy search
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      base: { type: Number, required: true },
      sale: { type: Number, default: null }, // Giá khuyến mãi
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
          validate: {
            validator: function(v) {
              // Kiểm tra URL hợp lệ
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
      },
    ],
    views: {
      type: Number,
      default: 0,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Thêm text index để hỗ trợ Fuzzy Search
productSchema.index({ name: "text", description: "text", tags: "text" });

// Middleware để đảm bảo tính duy nhất của hình ảnh
productSchema.pre('save', async function(next) {
  if (this.isModified('images')) {
    // Kiểm tra hình ảnh trùng lặp trong cùng sản phẩm
    const imageUrls = this.images.map(img => img.url);
    const uniqueUrls = [...new Set(imageUrls)];
    
    if (imageUrls.length !== uniqueUrls.length) {
      return next(new Error('Không được phép có hình ảnh trùng lặp trong cùng sản phẩm'));
    }

    // Kiểm tra hình ảnh trùng lặp với sản phẩm khác
    for (const imageUrl of imageUrls) {
      const existingProduct = await this.constructor.findOne({
        _id: { $ne: this._id },
        'images.url': imageUrl,
        isActive: true
      });
      
      if (existingProduct) {
        return next(new Error(`Hình ảnh "${imageUrl}" đã được sử dụng bởi sản phẩm khác`));
      }
    }

    // Đảm bảo có ít nhất một hình ảnh chính
    const hasPrimaryImage = this.images.some(img => img.isPrimary);
    if (!hasPrimaryImage && this.images.length > 0) {
      this.images[0].isPrimary = true;
    }
  }
  next();
});

// Middleware để đảm bảo tính duy nhất khi update
productSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.images) {
    const imageUrls = update.images.map(img => img.url);
    const uniqueUrls = [...new Set(imageUrls)];
    
    if (imageUrls.length !== uniqueUrls.length) {
      return next(new Error('Không được phép có hình ảnh trùng lặp trong cùng sản phẩm'));
    }

    // Kiểm tra hình ảnh trùng lặp với sản phẩm khác
    for (const imageUrl of imageUrls) {
      const existingProduct = await this.model.findOne({
        _id: { $ne: this.getQuery()._id },
        'images.url': imageUrl,
        isActive: true
      });
      
      if (existingProduct) {
        return next(new Error(`Hình ảnh "${imageUrl}" đã được sử dụng bởi sản phẩm khác`));
      }
    }
  }
  next();
});

export default mongoose.model("Product", productSchema);
