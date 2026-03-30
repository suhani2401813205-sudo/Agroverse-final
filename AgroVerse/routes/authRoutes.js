const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Show signup page
router.get("/signup", authController.showSignup);

// Handle signup form
router.post("/signup", authController.signupUser);

// Show login page
router.get("/login", authController.showLogin);

// Handle login form
router.post("/login", authController.loginUser);

module.exports = router;
