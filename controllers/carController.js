const Car = require("../models/mongo/Car");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

/**
 * Get all cars
 */
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

/**
 * Add new car
 */
const newCar = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { licensePlate } = req.body;

  try {
    let car = await Car.findOne({ licensePlate });
    if (car) {
      return res
        .status(400)
        .json({ msg: "An car already exist with this license plate" });
    }
    car = new Car(req.body);
    await car.save();
    res.json({ msg: "Car created successfuly", car: car });
  } catch (error) {
    console.log(error);
    res.status(400).send("Sorry, something went wrong");
  }
};

module.exports = {
  getCars,
  newCar,
};
