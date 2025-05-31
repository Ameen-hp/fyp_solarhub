const express = require('express');
const router = express.Router();
const packageOrderController = require('../controllers/PackageOrderSave');

// POST route to submit a new order
router.post('/', packageOrderController.createPackageOrder);

module.exports = router;
