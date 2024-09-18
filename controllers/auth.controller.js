const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const userModel = require('../models/index').User; 
const secret = 'cafeanjay'; 

// Fungsi untuk login dan generate token
const authenticate = async (req, res) => {
    const { username, password } = req.body;

    try {

        let dataUser = await userModel.findOne({ where: { username } });

        if (!dataUser) {
            return res.status(404).json({
                success: false,
                message: 'Username atau password salah',
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, dataUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Username atau password salah',
            });
        }

        const payload = {
            id_user: dataUser.id_user,
            role: dataUser.role,
        };

        // Generate token JWT
        const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token,
            user: {
                id_user: dataUser.id_user,
                nama_user: dataUser.nama_user,
                role: dataUser.role,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message,
        });
    }
};


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Mendapatkan token dari header

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Missing token',
        });
    }

    try {
        // Verifikasi token JWT
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Menyimpan informasi user ke dalam request
        next(); 
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token',
        });
    }
};

// Middleware untuk otorisasi berdasarkan role
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Anda tidak memiliki akses',
            });
        }
        next();
    };
};

module.exports = { authenticate, authenticateJWT, authorize };
