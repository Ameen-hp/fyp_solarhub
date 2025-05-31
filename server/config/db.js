// config/db.js
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const MONGO_URI = "mongodb+srv://Ameen:UpperCase123@solardata.9yfry.mongodb.net/?tls=true";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err);
  }
};

module.exports = dbConnect;
