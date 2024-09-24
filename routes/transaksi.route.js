const express = require('express');
const router = express.Router();
const transaksiControl = require('../controllers/transaksi.controller'); 
const verifyToken = require('../middlewares/auth'); // Middleware autentikasi

// Route untuk kasir melakukan transaksi
router.post('/kasir', verifyToken, transaksiControl.createTransaksi);
router.put('/kasir/update/:id_transaksi', verifyToken, transaksiControl.updateTransaksiStatus);
router.get('/kasir/getall', verifyToken, transaksiControl.getAllTransaksi)
router.get('/kasir/cetak/:id_transaksi',verifyToken, transaksiControl.printNota)
module.exports = router;
