// models/Package.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: String,
  category: String,
  summary: String,
  products: [{
    name: String,
    category: String,
    material: String,
    image_url: String,
    description: String,
    available: Boolean,
  }],
});

const Package = mongoose.model('packages', packageSchema);

module.exports = Package;
