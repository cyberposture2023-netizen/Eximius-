const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// @route   POST /api/users
router.post('/', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser); // <-- The missing route

module.exports = router;
