const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    console.log('Token Header:', tokenHeader);

    if (!tokenHeader) {
      return res.status(403).json({ success: false, error: 'Token not provided in the Authorization header' });
    }

    const token = tokenHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ success: false, error: 'Invalid token format' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        console.error('Error decoding token:', err);
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }

      req.user = { _id: decoded._id, role: decoded.role };
      next();
    });
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  console.log('User Role:', req.user && req.user.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Permission denied' });
  }
};

module.exports = { authenticateUser, isAdmin };
