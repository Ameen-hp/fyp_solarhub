const express = require('express');
const router = express.Router();

const {
  getAllUserQueries,
  createUserQuery,
  deleteUserQuery,
  confirmUserQuery,
} = require('../controllers/userQueryController');

// ✅ GET all queries
router.get('/', getAllUserQueries);

// ✅ POST route to store a new user query
router.post('/', createUserQuery);

// ✅ DELETE a query by ID
router.delete('/:id', deleteUserQuery);

// ✅ PUT to confirm a query by ID
router.put('/confirm/:id', confirmUserQuery);

module.exports = router;
  