const express = require("express");
const router = express.Router();
const {
  deleteCar,
  getCar,
  getCars,
  newCar,
  updateCar,
} = require("../controllers/carController");
const { check } = require("express-validator");

router.delete("/:id", deleteCar);

router.get("/:id", getCar);

router.get("/", getCars);

router.post(
  "/",
  [
    check("licensePlate", "The license plate field is required")
      .not()
      .isEmpty(),
    check("brand", "The brand field is required").not().isEmpty(),
    check("model", "The model field is required").not().isEmpty(),
    check("year", "The year field is required").not().isEmpty(),
    check("price", "The price field is required").not().isEmpty(),
    check("description", "The description field is required").not().isEmpty(),
    check("color", "The color field is required").not().isEmpty(),
    check("doors", "The doors field is required").not().isEmpty(),
    check("fuel", "The fuel field is required").not().isEmpty(),
    check("milage", "The milage field is required").not().isEmpty(),
  ],
  newCar
);

router.put("/:id", updateCar);

module.exports = router;
