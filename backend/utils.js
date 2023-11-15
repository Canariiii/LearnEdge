var jwt = require('jsonwebtoken');
 
function generateToken(user) {
  if (!user) return null;
 
  var u = {
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone,
    role: user.role
  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
 
// return basic user details
function getCleanUser(user) {
  if (!user) return null;
 
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone,
    role: user.role
  };
}
 
module.exports = {
  generateToken,
  getCleanUser
}