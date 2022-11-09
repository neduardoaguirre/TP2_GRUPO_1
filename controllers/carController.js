const Car = require('../models/mongo/Car');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { licensePlate } = req.body;

  try {
    let car = await Car.findOne({ licensePlate });
    if (car) {
      return res.status(400).json({ msg: 'An car already exist with this license plate' });
    }
    car = new Car(req.body);
    await car.save();
    res.json({ msg: 'Car created successfuly', car: car });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
