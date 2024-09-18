const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key_for_jwt';

// Middleware untuk verifikasi token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); // Format: "Bearer <token>"
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk otorisasi berdasarkan role
exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Anda tidak memiliki akses' });
    }
    next();
  };
};
