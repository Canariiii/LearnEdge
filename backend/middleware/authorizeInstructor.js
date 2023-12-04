const authorizeInstructor = (req, res, next) => {
  // Verifica si req.user está definido y tiene una propiedad role
  if (req.user && req.user.role === 'instructor') {
    return next();
  } else {
    return res.status(403).json({ success: false, error: 'Acceso denegado. No eres un instructor.' });
  }
};

module.exports = authorizeInstructor;
