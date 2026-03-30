const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

// Show Crop Selection Page
router.get("/", cropController.showCropSelection);

// Handle Form Submission and Show Result
router.post("/result", cropController.getRecommendation);

module.exports = router;