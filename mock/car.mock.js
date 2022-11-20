const Car = require("../models/Car");

const carMock = new Car({
  licensePlate: "AE299AB",
  brand: "Jeep",
  year: 2022,
  model: "Renegade",
  description: "Automatico full",
  price: 6500000,
  doors: 5,
  milage: 0,
  fuel: "Nafta",
  color: "Negro",
});

module.exports = {
  carMock,
};
