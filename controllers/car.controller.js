const Car = require('../models/Car');
const { validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

/**
 * Delete car by id
 */
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const car = await Car.findByIdAndDelete({ _id: id });
      if (car) {
        res.status(200).send('Car deleted successfully');
      } else {
        res.status(400).send('Invalid car id');
      }
    } else {
      res.status(400).send('Invalid car id');
    }
  } catch (error) {
    res.status(422).json(error).send('Sorry, something went wrong');
  }
};

/**
 * Get car by id
 */
const getCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const car = await Car.findById({ _id: id });
      res.status(200).json(car);
    } else {
      res.status(400).send('Invalid car id');
    }
  } catch (error) {
    res.status(400).json(error).send('Sorry, something went wrong');
  }
};

/**
 * Get all cars
 */
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(422).json(error).send('Sorry, something went wrong');
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
      return res.status(409).json({ msg: 'An car already exist with this license plate' });
    }
    car = new Car(req.body);
    await car.save();
    res.status(201).json({ msg: 'Car created successfully', car: car });
  } catch (error) {
    res.status(422).json(error).send('Sorry, something went wrong');
  }
};

/**
 * Update car by id
 */
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;

    if (!isValidObjectId(id)) {
      res.status(404).send('Invalid car id');
    } else if (updatedValues && Object.keys(updatedValues).length) {
      const existCar = await Car.findOne({
        licensePlate: updatedValues.licensePlate
      });

      if (existCar && existCar.id !== id) {
        res.status(409).send('License plate already in use');
      } else {
        const car = await Car.findOneAndUpdate({ _id: id }, { $set: updatedValues }, { new: true });
        res.status(200).json(car);
      }
    } else {
      res.status(400).send('Missing car body params');
    }
  } catch (error) {
    res.status(422).json(error).send('Sorry, something went wrong');
  }
};

module.exports = {
  deleteCar,
  getCar,
  getCars,
  newCar,
  updateCar
};
