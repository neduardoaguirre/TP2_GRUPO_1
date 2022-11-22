const Advertisement = require("../models/Advertisement");
const Car = require("../models/Car");

const carMock = new Car({
  licensePlate: "AOP672BB",
  brand: "Toyota",
  year: 2022,
  model: "Yaris",
  description: "Manual",
  price: 1000000,
  doors: 5,
  milage: 0,
  fuel: "Fuel",
  color: "Black",
});

const date = new Date()

const advertisementMock = new Advertisement ({
    car: carMock,
    date: date.toString(),
    paid: true,
    comments: [],
    title: "Toyota Yaris on sale",
    description: "New car, 0 km",
    location: "Recoleta, CABA"
});

module.exports = {
  advertisementMock
};