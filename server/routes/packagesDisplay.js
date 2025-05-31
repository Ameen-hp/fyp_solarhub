// In your routes file (packageRoutes.js)
const express = require('express');
const router = express.Router();
const { getPackageById } = require('../controllers/PackageDisplay');

router.get('/package/:id', getPackageById);  // Route to fetch package by ID

module.exports = router;
