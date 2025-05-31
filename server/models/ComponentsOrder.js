const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  name: String,
  category: String,
  application: String,
  type: String,
  material: String,
  image_url: String,
  description: String,
  features: [String], // adjust if needed
  wire_diameter: String,
  color: String,
  voltage_rating: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  available: Boolean,
});

module.exports = mongoose.model('comp', campSchema);
