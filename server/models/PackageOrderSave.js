const mongoose = require('mongoose');

const packageOrderSchema = new mongoose.Schema({
  packageId: String,
  packageName: String,
  packagePrice: Number,
  fullName: String,
  email: String,
  phone: String,
  address: String,
  deliveryAddress: String,
  contactNumber: String,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now },
});

const PackageOrder = mongoose.model('PackageOrdersData', packageOrderSchema);

module.exports = PackageOrder;
