const Client = require('../models/Client');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Login Client
 */
const loginClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ msg: 'Incorrect user and/or password' });
    }
    const passwordCheckup = await bcryptjs.compare(password, client.password);
    if (!passwordCheckup) {
      return res.status(401).json({ msg: 'Incorrect user and/or password' });
    }
    const payload = { client: { id: client.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token: token, msg: 'Login successfuly' });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

module.exports = {
  loginClient
};
