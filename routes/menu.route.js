const express = require('express');
const router = express.Router();
const menuControl = require('../controllers/menu.controller'); // Sesuaikan path controller
const { authenticateJWT, authorize } = require('../controllers/auth.controller');


router.post('/admin/create',authenticateJWT, authorize(['admin']), menuControl.create_menu);
router.get('/admin/all',authenticateJWT, authorize(['admin']), menuControl.getall_menu);
router.put('/admin/update/:id_menu',authenticateJWT, authorize(['admin']), menuControl.update_menu);
router.delete('/admin/delete/:id_menu',authenticateJWT, authorize(['admin']), menuControl.delete_menu);

module.exports = router;
