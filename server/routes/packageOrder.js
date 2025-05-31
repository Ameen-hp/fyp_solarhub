// server/routes/packageOrder.js
const express = require('express'); // Using require for express
const { getPackageById } = require('../controllers/packageOrder'); // Importing controller

const router = express.Router();

// Route to fetch package by ID
router.get('/packageOrderInfor/:id', getPackageById);

module.exports = router; // Exporting the router
