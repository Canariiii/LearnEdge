const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(403).json({ success: false, error: 'Token not provided in the Authorization header' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ success: false, error: 'Token has expired' });
    }
    return res.status(403).json({ success: false, error: 'Invalid token' });
  }
  
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Permission denied' });
  }
};

module.exports = { authenticateUser, isAdmin };
