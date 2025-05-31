// routes/repairRoutes.js
const express = require('express');
const router = express.Router();
const { submitRepairForm, getAllRepairOrders, deleteRepairOrder, confirmRepairOrder } = require('../controllers/RepairOrderShow');

// Submit Repair Order
router.post('/', submitRepairForm);

// Get All Repair Orders (for host view)
router.get('/', getAllRepairOrders);

// Delete Repair Order
router.delete('/:orderId', deleteRepairOrder);

// Confirm Repair Order and Send Email
router.put('/:orderId/confirm', confirmRepairOrder);

module.exports = router;
