const User = require('../models/user');

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // req.user.id is available from the authMiddleware
        const user = await User.findById(req.user.id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;

            // Note: We are not handling password changes here for simplicity.

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Update User Profile Error:', err.message);
        res.status(500).json({ error: 'Server error while updating user profile.' });
    }
};
