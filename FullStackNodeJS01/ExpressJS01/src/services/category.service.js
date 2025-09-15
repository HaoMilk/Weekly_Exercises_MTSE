// services/category.service.js
import Category from "../models/Category.js";

export function findAllCategories() {
  return Category.find({ isActive: true }).sort({ name: 1 }).exec();
}

export function findCategoryById(id) {
  return Category.findById(id).exec();
}

export function createNewCategory(data) {
  return Category.create(data);
}

export function updateCategoryById(id, data) {
  return Category.findByIdAndUpdate(id, data, { new: true }).exec();
}

export function deleteCategoryById(id) {
  return Category.findByIdAndDelete(id).exec();
}
