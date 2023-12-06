const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ success: false, error: 'Token not provided in the Authorization header' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(403).json({ success: false, error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Si es admin, permite continuar
  } else {
    res.status(403).json({ success: false, error: 'Permission denied' });
  }
};

module.exports = { authenticateUser, isAdmin };
