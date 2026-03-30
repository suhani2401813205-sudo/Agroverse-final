const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');

// Make sure this matches the URL you want
router.get('/', schemeController.showSchemesPage);

module.exports = router;