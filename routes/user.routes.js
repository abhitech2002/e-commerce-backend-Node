const express = require("express");
const {
    registerUser,
    loginUser,  
    getUserProfile,
    updateUserProfile} = require("../controllers/user.controller.js");

const { protect } = require("../middlewares/auth.middleware.js");

const router = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", protect, getUserProfile);
router.put("/profile/:id", protect, updateUserProfile);

module.exports = router