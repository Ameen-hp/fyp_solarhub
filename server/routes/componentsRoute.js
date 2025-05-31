const express = require('express');
const router = express.Router();
const { getAllComponents } = require('../controllers/ComponentsController');

router.get('/', getAllComponents);

module.exports = router;
