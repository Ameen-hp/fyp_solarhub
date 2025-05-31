const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

// Routes
const { connectElastic } = require('./utils/elasticsearchClient');
const authRoutes = require('./routes/authRoutes');
const componentRoutes = require('./routes/componentsRoute');
const userQueryRoutes = require('./routes/userQueryRoutes');
const chatRoutes = require('./routes/chatRoutes');
const ComponentsOrder = require('./routes/ComponentsOrders');
const SaveCustomerOrder = require("./routes/customerOrderComp");
const ShowHostCompOrders = require("./routes/HostCompOrder");
const ShowPackageDetails = require("./routes/packagesDisplay");
const packageOrder = require("./routes/packageOrder");
const PackageOrderSave = require("./routes/PackageOrderSave")
const showPackageOrdersToHost = require("./routes/ShowPackageOrdersToHost") 
let  repairOrders = require("./routes/repairRoutes")
let repairOrderShow = require("./routes/RepairOrderShow");
let feedback = require("./routes/feedback");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://Ameen:UpperCase123@solardata.9yfry.mongodb.net/solarhub?tls=true";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Elasticsearch
connectElastic();

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/repair', repairRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/user-queries', userQueryRoutes);
app.use('/api/chat', chatRoutes);
app.use(ComponentsOrder);
app.use(SaveCustomerOrder);
app.use('/api/order', ShowHostCompOrders);
app.use("/api", ShowPackageDetails); // Uncomment if needed
app.use("/api",packageOrder)
app.use('/api/packageOrder', PackageOrderSave);
app.use('/api', showPackageOrdersToHost);
app.use('/api/repair', repairOrders);
app.use('/api/repair', repairOrderShow);
app.use('/api/feedbacks', feedback);

// 404 Handler (Route not found)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler (for unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
