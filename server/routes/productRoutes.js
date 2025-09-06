const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getUserProducts, // <-- 1. Function is imported
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Private route: Get products for the logged-in user
router.get('/my-listings', authMiddleware, getUserProducts); // <-- 2. Route is added and protected

// Public route: Get all products
router.get('/', getProducts);

// Public route: Get a single product
router.get('/:id', getProductById);

// Private route: Create a new product
router.post('/', authMiddleware, createProduct);

// Private route: Update a product
router.put('/:id', authMiddleware, updateProduct);

// Private route: Delete a product
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;

