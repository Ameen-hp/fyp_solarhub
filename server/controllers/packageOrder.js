// server/controllers/packageOrder.js
const Package = require('../models/packagesDisplay'); // Adjust if needed

// GET a specific package by custom string ID
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findOne({ id: req.params.id }); // ✅ Treat 'id' as a string
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPackageById };
