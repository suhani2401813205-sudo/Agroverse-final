const express = require("express")
const router = express.Router()

const marketController = require("../controllers/marketController");

router.get("/",marketController.showMarketPage);

router.post("/check",marketController.getMarketPrice);

module.exports = router;