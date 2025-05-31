const Package = require('../models/packagesDisplay');

const getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    // ✅ Search using the `id` field as a string
    const packageData = await Package.findOne({ id: id });

    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(packageData);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getPackageById };
