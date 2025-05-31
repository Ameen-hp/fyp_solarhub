const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerAddress: String,
  customerPhone: String,
  paymentMethod: String,
  orderStatus: {
    type: String,
    default: 'Pending', // Can be 'Pending', 'Confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('componentsOrders', orderSchema);
