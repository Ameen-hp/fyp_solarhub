// controllers/componentController.js
const Component = require('../models/Components');

// GET all components
const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.status(200).json(components);
  } catch (error) {
    console.error('❌ Error fetching components:', error);
    res.status(500).json({ message: 'Failed to fetch components' });
  }
};

module.exports = { getAllComponents };
