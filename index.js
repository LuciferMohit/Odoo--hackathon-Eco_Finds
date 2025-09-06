const express = require("express");
const cors = require("cors"); // <-- 1. IMPORT THE CORS PACKAGE
const connectDB = require("./db");
const productRoutes = require("./server/routes/productRoutes");
const authRoutes = require("./server/routes/authRoutes");
const authMiddleware = require("./server/middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors()); // <-- 2. USE THE CORS MIDDLEWARE (place it before your routes)
app.use(express.json());

// Secret route (protected)
app.get("/api/secret", authMiddleware, (req, res) => {
    res.json({ message: "This is a secret route 🔒", user: req.user });
});

// Connect to DB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});