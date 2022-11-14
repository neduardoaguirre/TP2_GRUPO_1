const jwt = require('jsonwebtoken');

/**
 * Middleware to check token
 */
module.exports = function (req, res, next) {
  // Read token from header
  const token = req.header('x-auth-token');
  const role = req.header('role');
  // Check if there is no token and role
  if (!token) return res.status(401).json({ msg: 'No token, permission denied' });

  // Validate token
  try {
    const encrypted = jwt.verify(token, process.env.SECRET);
    req.user = encrypted.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
