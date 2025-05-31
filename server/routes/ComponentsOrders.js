const express = require('express');
const router = express.Router();
const Camp = require('../models/Components');

// GET /api/ComponentOrder/:id
router.get('/api/ComponentOrder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request for component ID:", id);

    const component = await Camp.findById(id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json(component);
  } catch (error) {
    console.error("Error fetching component by ID:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
