const Auto = require('../models/mongo/Auto');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newAuto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { licensePlate } = req.body;

  try {
    let auto = await Auto.findOne({ licensePlate });
    if (auto) {
      return res.status(400).json({ msg: 'An car already exist with this license plate' });
    }
    auto = new Auto(req.body);
    await auto.save();
    res.json({ msg: 'Car created successfuly', car: auto });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
