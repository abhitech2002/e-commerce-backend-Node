const User = require("../models/User.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password, phone, address, role } = req.body;

        if (!name || !email || !password || !phone ) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const userRole = role === "admin" ? "admin" : "user";
        const isAdmin = role === "admin";
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            phone: phone.trim(),
            address: address ? address.trim() : "",
            role: userRole,
            isAdmin
        });

        const result = await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully.", data: result });
})

// Login a registered user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const {password: _, ...userData} = user.toObject();

        res.status(200).json({ success: true, message: "User logged in successfully.", token, user: userData });
})

// Get a user by ID
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
        const user = await User.findById(userId).select("-password").lean();
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User profile retrieved successfully.", data: user });
})

// Update a user by ID
const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, address, phone } = req.body;
    const userId = req.user.id;
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
})

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
}