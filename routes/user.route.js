const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, deleteUser, updateUser } = require('../controllers/user.controller');
const { authenticateJWT, authorize } = require('../controllers/auth.controller');

// admin route
router.post('/admin/create_user',authenticateJWT, authorize(['admin']), createUser);
router.get('/admin/getalluser', authenticateJWT, authorize(['admin']), getAllUsers);
router.put('/admin/update/:id_user', authenticateJWT, authorize(['admin']), updateUser);
router.delete('/admin/delete/:id_user', authenticateJWT, authorize(['admin']), deleteUser);


module.exports = router;
// authenticateJWT, authorize(['superadmin']),