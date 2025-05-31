// models/Package.js
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: String,
  price: String,
  features: [String]
});

export default mongoose.model('packages', packageSchema);
