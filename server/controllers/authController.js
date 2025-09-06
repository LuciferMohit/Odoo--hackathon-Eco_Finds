const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, "secretkey", {
            expiresIn: "1h",
        });

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
