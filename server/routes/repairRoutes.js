// routes/repairRoutes.js
const express = require('express');
const router = express.Router();
const { submitRepairForm } = require('../controllers/RepairOrder');

router.post('/', submitRepairForm);

module.exports = router;
