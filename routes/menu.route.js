const express = require('express');
const router = express.Router();
const { menuControl } = require('../controllers');
const { authenticateJWT, authorize } = require('../controllers/auth.controller');

router.post('/admin', authenticateJWT, authorize(['admin']), menuControl )
