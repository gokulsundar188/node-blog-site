const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.get('/about', aboutController.about_details);

router.get('/about-us', aboutController.about_redirect);

module.exports = router;