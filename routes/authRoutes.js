const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser
} = require('../Controllers/authController');

// Registration API
router.post('/register', registerUser);

// Login API
router.post('/login', loginUser);

module.exports = router;