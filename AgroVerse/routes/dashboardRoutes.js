const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authController = require("../controllers/authController");

// If user goes to /dashboard
router.get('/', dashboardController.showDashboard);

module.exports = router;
