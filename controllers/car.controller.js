const Car = require("../models/Car");
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const CarRepository = require("../repositories/car.repository");

/**
 * Delete car by id
 */
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await CarRepository.delete(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("CarController - deleteCar - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Get car by id
 */
const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CarRepository.get(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("CarController - getCar - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Get all cars
 */
const getCars = async (req, res) => {
  try {
    const response = await CarRepository.getAll();
    res.status(response.status).json(response);
  } catch (error) {
    console.error("CarController - getCars - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
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

  try {
    const carBody = req.body;
    const response = await CarRepository.save(carBody);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("CarController - newCar - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Update car by id
 */
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const carBody = req.body;
    const response = await CarRepository.edit(id, carBody);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("CarController - updateCar - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

module.exports = {
  deleteCar,
  getCar,
  getCars,
  newCar,
  updateCar,
};
