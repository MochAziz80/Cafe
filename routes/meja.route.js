const express = require('express');
const router = express.Router();
const mejaControl = require('../controllers/meja.controller');

// CRUD Routes
router.post('/admin/create', mejaControl.create_meja);
router.get('/admin/all', mejaControl.get_all_mejas);
router.get('/admin/:id_meja', mejaControl.get_meja_by_id);
router.put('/admin/update/id/:id_meja', mejaControl.update_meja);
router.put('/admin/update/:nomor_meja', mejaControl.update_status_by_nomor_meja);
router.delete('/admin/delete/:id_meja', mejaControl.delete_meja);

module.exports = router;
