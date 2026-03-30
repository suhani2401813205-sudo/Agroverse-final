const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");   // ✅ FIXED
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


const diseaseController = require("../controllers/diseaseController");


// ✅ Show detection page
router.get("/disease", (req, res) => {
res.render("disease/disease-detection"); // your form page
});

// ✅ THIS LINE MUST EXIST
router.post("/predict", upload.single("file"), diseaseController.detectDisease);

module.exports = router;