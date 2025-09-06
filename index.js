const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./server/routes/productRoutes");
const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes"); // <-- 1. IMPORT USER ROUTES
const authMiddleware = require("./server/middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Secret route (for testing)
app.get("/api/secret", authMiddleware, (req, res) => {
    res.json({ message: "This is a secret route 🔒", user: req.user });
});

// Connect to DB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // <-- 2. USE USER ROUTES

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
