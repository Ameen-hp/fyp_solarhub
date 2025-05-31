const mongoose = require('mongoose'); // Import mongoose
const Package = require('../models/packageDisplay'); // Ensure the correct path to model

const getPackageDetails = async (req, res) => {
  const { category, id } = req.params;

  try {
    const pkg = await Package.findOne({
      category,
      _id: mongoose.Types.ObjectId(id), // Correct way to create ObjectId from mongoose
    });

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(pkg);
  } catch (error) {
    console.error('Error fetching package:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getPackageDetails,
};
