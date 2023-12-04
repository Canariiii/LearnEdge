const authorizeInstructor = (req, res, next) => {
    if (req.user.role == 'instructor') {
      return next();
    } else {
      return res.status(403).json({ success: false, error: 'Acceso denegado. No eres un instructor.' });
    }
  };
  
  module.exports = authorizeInstructor;
  