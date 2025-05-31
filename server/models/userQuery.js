const mongoose = require('mongoose');

const userQuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  confirmed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('UserQuery', userQuerySchema);
