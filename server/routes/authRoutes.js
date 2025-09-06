// In server/routes/authRoutes.js

const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware'); // Make sure this is imported



router.post('/register', authController.register);

router.post('/login', authController.login);



// VERIFY ROUTE

router.get('/verify', authMiddleware, (req, res) => {

// If authMiddleware passes, the token is valid.

// req.user is added by the middleware.

    res.status(200).json(req.user);

});



module.exports = router;