const User = require("../models/User.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;

        // Check if the all filleds are filled
        if (!name || !email || !password || !phone ) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role
        });

        const result = await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully.", data: result });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error registering user.", error: error.message });
    }
}

module.exports = {
    registerUser
}