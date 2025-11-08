const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// @route   POST /api/users
router.post('/', registerUser, loginUser);
// We will add the login route POST /api/users/login later

module.exports = router;

