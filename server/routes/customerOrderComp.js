const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/customerOrderComp');

// POST /api/order
router.post('/api/customerComOrder', createOrder);

module.exports = router;
