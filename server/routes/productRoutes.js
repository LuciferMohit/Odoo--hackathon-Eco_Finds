const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a product (protected)
router.post("/", authMiddleware, createProduct);

// Get all products
router.get("/", getProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Update product by ID (protected)
router.put("/:id", authMiddleware, updateProduct);

// Delete product by ID (protected)
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
