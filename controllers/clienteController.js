const Cliente = require('../models/mongo/Cliente');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let cliente = await Cliente.findOne({ email });

    if (cliente) {
      return res.status(400).json({ msg: 'A client already exist with this email address' });
    }

    cliente = new Cliente(req.body);
    const salt = await bcryptjs.genSalt(10);
    cliente.password = await bcryptjs.hash(password, salt);
    await cliente.save();

    const payload = {
      cliente: {
        id: cliente.id
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
