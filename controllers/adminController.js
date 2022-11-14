const Admin = require('../models/mongo/Admin');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ msg: 'A admin already exist with this email address' });
    }

    admin = new Admin(req.body);
    const salt = await bcryptjs.genSalt(10);
    admin.password = await bcryptjs.hash(password, salt);
    await admin.save();
    res.json({ admin: admin, msg: 'Admin created succesfuly' });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
