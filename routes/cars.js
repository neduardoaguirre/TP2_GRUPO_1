// routes/cars.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "636af9b732bdc95cd6db3592"
 *         licensePlate:
 *           type: string
 *           example: "AE788EB"
 *         brand:
 *           type: string
 *           example: "Toyota"
 *         model:
 *           type: string
 *           example: "Yaris"
 *         year:
 *           type: integer
 *           example: 2022
 *         price:
 *           type: integer
 *           example: 2500000
 *         description:
 *           type: string
 *           example: "Full con ABS"
 *         image:
 *           type: string
 *           example: "https://www.jeep.com.ar/content/dam/cross-regional/latam/jeep/es_ar/bhp/lineup/Jeep-Renegade-2022-new.jpg.img.300.jpg"
 *         color:
 *           type: string
 *           example: "Gris"
 *         doors:
 *           type: integer
 *           example: 5
 *         fuel:
 *           type: string
 *           example: "Nafta"
 *         milage:
 *           type: integer
 *           example: 1000
 *         __v:
 *           type: integer
 *           example: 0
 *       required:
 *         - licensePlate
 *         - brand
 *         - model
 *         - year
 *         - price
 *         - description
 *         - color
 *         - doors
 *         - fuel
 *         - milage
 */

/**
 * @swagger
 *
 * /cars:
 *  get:
 *    summary: Get list of all cars.
 *    description: Get list of all cars.
 *    responses:
 *      200:
 *        description: A list of cars.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Car'
 */

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
