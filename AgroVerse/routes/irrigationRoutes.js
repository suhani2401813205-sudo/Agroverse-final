const express = require("express");
const router = express.Router();
const irrigationController = require("../controllers/irrigationController");

// GET request → show the irrigation form
router.get("/", irrigationController.showIrrigationPage);

// POST request → handle recommendation
router.post("/calculate", irrigationController.getIrrigationRecommendation);

module.exports = router;