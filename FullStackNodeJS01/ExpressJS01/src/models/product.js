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
        url: String,
        alt: String,
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

export default mongoose.model("Product", productSchema);
