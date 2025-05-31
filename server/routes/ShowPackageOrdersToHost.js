const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  deleteOrder,
  confirmOrder
} = require('../controllers/ShowPackageOrdersToHost');

// All orders
router.get('/packageOrders', getAllOrders);

// Delete order by ID
router.delete('/packageOrder/:orderId', deleteOrder);

// Confirm order by ID
router.put('/packageOrder/confirm/:orderId', confirmOrder);

module.exports = router;
