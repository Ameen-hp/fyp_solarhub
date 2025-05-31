const express = require('express');
const { chatQuery } = require('../controllers/chatController');
const router = express.Router();

router.post('/chat', chatQuery);

module.exports = router;