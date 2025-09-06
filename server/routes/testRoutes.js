const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Public route
router.get('/hello', (req, res) => {
    res.send('Hello from EcoFinds API 👋');
});

// Protected route
router.get('/secret', authMiddleware, (req, res) => {
    res.send(`Welcome ${req.user.email}, this is a protected route 🔒`);
});

module.exports = router;
