const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No token provided, Unauthorized'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'cafeanjay'); // Secret Key
        console.log('Decoded Token:', decoded); // Debug isi token
        req.user = decoded; // Simpan data decoded di req.user
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token, Unauthorized'
        });
    }
};

module.exports = authMiddleware;
