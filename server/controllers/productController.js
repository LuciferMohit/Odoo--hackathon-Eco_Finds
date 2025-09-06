const Product = require('../models/product');

// Create product - **UPDATED WITH SELLER LOGIC**
exports.createProduct = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;
        // req.user.id comes from the authMiddleware after token verification
        const seller = req.user.id;

        const product = new Product({
            title,
            description,
            category,
            price,
            seller, // Associate the product with the logged-in user
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Create Product Error:', err.message);
        res.status(500).json({ error: 'Server error while creating product.' });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Replace the old updateProduct function in server/controllers/productController.js

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // --- SECURITY CHECK ---
        // Check if the user making the request is the owner of the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // If the check passes, update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // {new: true} returns the updated document
        );

        res.json(updatedProduct);
    } catch (err) {
        console.error("Update Product Error:", err.message);
        res.status(500).json({ error: "Server error while updating product." });
    }
};

// Replace the old deleteProduct function in server/controllers/productController.js

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // --- SECURITY CHECK ---
        // Check if the user making the request is the owner of the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        await product.deleteOne(); // Use .deleteOne() on the found document

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Delete Product Error:", err.message);
        res.status(500).json({ error: "Server error while deleting product." });
    }
};

// Add this function to server/controllers/productController.js

exports.getUserProducts = async (req, res) => {
    try {
        // req.user.id is made available by the authMiddleware
        const products = await Product.find({ seller: req.user.id });
        res.json(products);
    } catch (err) {
        console.error('Get User Products Error:', err.message);
        res.status(500).json({ error: 'Server error while fetching user products.' });
    }
};

