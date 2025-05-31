// controllers/repairController.js
const Repair = require('../models/ReairOrderShow');

const submitRepairForm = async (req, res) => {
  try {
    const { name, email, phone, location, problem } = req.body;

    const newRepair = new Repair({ name, email, phone, location, problem });
    await newRepair.save();

    res.status(201).json({ message: 'Repair request saved successfully.' });
  } catch (error) {
    console.error('Error saving repair request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { submitRepairForm };
