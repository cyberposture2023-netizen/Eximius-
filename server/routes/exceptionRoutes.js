const express = require('express');
const router = express.Router();
const {
  getExceptions,
  createException,
} = require('../controllers/exceptionController');

// We can chain GET and POST for the same route '/'
router.route('/').get(getExceptions).post(createException);

// We will add routes for '/:id' (GET, PUT, DELETE) in a future step

module.exports = router;
