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

// Login a registered user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "User logged in successfully.", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error logging in user.", error: error.message });
    }
}

// Get a user by ID
const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User profile retrieved successfully.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error getting user profile.", error: error.message });
    }
}

// Update a user by ID
const updateUserProfile = async (req, res) => {
    const { name, email, address, phone } = req.body;
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;
        user.phone = phone || user.phone;

        const updatedUser = await user.save();
        res.status(200).json({ success: true, message: "User profile updated successfully.", data: updatedUser });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user profile.", error: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
}