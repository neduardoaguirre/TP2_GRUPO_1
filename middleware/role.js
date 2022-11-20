require("dotenv").config({ path: ".env" });

const SKIP_ROLE = (/^true$/i).test(process.env.SKIP_ROLE);

/**
 * Middleware to check role
 */

const isAdmin = (req, res, next) => {
  if (SKIP_ROLE) {
    next();
    return;
  }

  // Read role from header
  const role = req.header('role');
  if (!role || role !== 'admin')
    return res.status(401).json({ msg: 'You do not have permissions to perform this operation' });
  next();
};

const isClient = (req, res, next) => {
  if (SKIP_ROLE) {
    next();
    return;
  }

  // Read role from header
  const role = req.header('role');
  if (!role || role !== 'client')
    return res.status(401).json({ msg: 'You do not have permissions to perform this operation' });
  next();
};

module.exports = {
  isAdmin,
  isClient
};
