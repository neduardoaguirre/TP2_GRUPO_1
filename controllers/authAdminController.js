const Admin = require('../models/Admin');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Login Admin
 */
const loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Incorrect user and/or password' });
    }
    const passwordCheckup = await bcryptjs.compare(password, admin.password);
    if (!passwordCheckup) {
      return res.status(400).json({ msg: 'Incorrect user and/or password' });
    }
    const payload = { admin: { id: admin.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token, msg: 'Login successfuly' });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginAdmin
};
