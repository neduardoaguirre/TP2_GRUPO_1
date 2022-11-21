require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');

const SKIP_AUTH = /^true$/i.test(process.env.SKIP_AUTH);

/**
 * Middleware to check token
 */
module.exports = function (req, res, next) {
  if (SKIP_AUTH) {
    next();
    return;
  }

  // Read token from header
  const token = req.header('x-auth-token');
  const role = req.header('role');
  // Check if there is no token and role
  if (!token) return res.status(401).json({ msg: 'No token, permission denied' });

  // Validate token
  try {
    const encrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = encrypted.user;
    next();
  } catch (error) {
    res.status(422).json({ msg: 'Invalid token' });
  }
};
