// controllers/componentController.js
const Component = require('../models/ComponentsOrder');

// Get component by ID
exports.getComponentById = async (req, res) => {
  const { id } = req.params;
  try {
    const component = await Component.findById(id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};