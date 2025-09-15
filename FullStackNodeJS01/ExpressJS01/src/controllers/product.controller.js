// controllers/product.controller.js
import {
    findProducts,
    findProductById,
    createNewProduct,
    updateProductById,
    deleteProductById,
  } from "../services/product.service.js";
  
  export async function listProducts(req, res) {
    try {
      const products = await findProducts(req.query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export async function getProduct(req, res) {
    try {
      const product = await findProductById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export async function createProduct(req, res) {
    try {
      const product = await createNewProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  export async function updateProduct(req, res) {
    try {
      const product = await updateProductById(req.params.id, req.body);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  export async function deleteProduct(req, res) {
    try {
      const deleted = await deleteProductById(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  