const express = require('express');
const router = express.Router();
const { authenticate, authenticateJWT, authorize } = require('../controllers/auth.controller');

// Route untuk login
router.post('/login', authenticate);

module.exports = router;