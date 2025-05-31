const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPhone: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ComponentsOrder', orderSchema);
