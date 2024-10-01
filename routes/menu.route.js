const express = require('express');
const router = express.Router();
const menuControl = require('../controllers/menu.controller'); // Sesuaikan path controller

router.post('/admin/create', menuControl.create_menu);
router.get('/admin/all', menuControl.getall_menu);
router.put('/admin/update/:id_menu', menuControl.update_menu);
router.delete('/admin/delete/:id_menu', menuControl.delete_menu);

module.exports = router;
