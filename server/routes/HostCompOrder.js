const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  confirmOrder,
  deleteOrder,
} = require('../controllers/HostComOrder'); // ✅ Adjust path if needed

// GET all orders
router.get('/getAllOrders', getAllOrders);
    
// POST confirm order
router.post('/confirmOrder/:orderId', confirmOrder);

// DELETE order
router.delete('/deleteOrder/:orderId', deleteOrder);

module.exports = router;
