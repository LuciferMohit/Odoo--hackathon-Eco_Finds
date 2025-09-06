const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
