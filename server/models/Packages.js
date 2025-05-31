const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  material: String,
  description: String,
  image_url: String,
  available: Boolean
});

const packageSchema = new mongoose.Schema({
  Package_Name: String,
  products: [productSchema],  // Array of product items
  total_price: Number
});

const Package = mongoose.model('Packages', packageSchema);

module.exports = Package;
