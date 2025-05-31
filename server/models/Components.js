const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image_url: String,
  category: String,
  type: String,
  warranty: String,
  compatibility: String,
  availability: String
});

// Tell Mongoose to use the exact collection name: 'comp'
module.exports = mongoose.model('Component', componentSchema, 'comp');
