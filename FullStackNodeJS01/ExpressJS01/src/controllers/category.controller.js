// controllers/category.controller.js
import {
    findAllCategories,
    findCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById,
  } from "../services/category.service.js";
  
  export async function getCategories(req, res) {
    try {
      const categories = await findAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export async function getCategory(req, res) {
    try {
      const category = await findCategoryById(req.params.id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export async function createCategory(req, res) {
    try {
      const category = await createNewCategory(req.body);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  export async function updateCategory(req, res) {
    try {
      const category = await updateCategoryById(req.params.id, req.body);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  export async function deleteCategory(req, res) {
    try {
      const deleted = await deleteCategoryById(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Category not found" });
      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  