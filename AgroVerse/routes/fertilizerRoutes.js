const express = require("express");
const router = express.Router();
const fertilizerController = require("../controllers/fertilizerController");

router.get("/", fertilizerController.showFertilizerPage);
router.post("/recommend", fertilizerController.getRecommendation);

module.exports = router;