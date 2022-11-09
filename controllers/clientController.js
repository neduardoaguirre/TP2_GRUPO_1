const Client = require('../models/mongo/Client');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res.status(400).json({ msg: 'A client already exist with this email address' });
    }

    client = new Client(req.body);
    const salt = await bcryptjs.genSalt(10);
    client.password = await bcryptjs.hash(password, salt);
    await client.save();

    const payload = {
      cliente: {
        id: client.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
