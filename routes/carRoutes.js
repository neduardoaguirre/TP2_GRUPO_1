/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "636af9b732bdc95cd6db3592"
 *             __v:
 *               type: integer
 *               example: 0
 *         - $ref: '#/components/schemas/BodyCar'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BodyCar:
 *       type: object
 *       properties:
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
 * /cars/{id}:
 *  delete:
 *    tags:
 *      - Cars
 *    summary: Delete a car by id.
 *    description: Delete a car by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the car
 *    responses:
 *      200:
 *        description: If the operation was successfully return 200.
 */

/**
 * @swagger
 *
 * /cars:
 *  get:
 *    tags:
 *      - Cars
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

/**
 * @swagger
 *
 * /cars/{id}:
 *  get:
 *    tags:
 *      - Cars
 *    summary: Get a car by id.
 *    description: Get a car by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the car
 *    responses:
 *      200:
 *        description: A car.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 *
 * /cars/{id}:
 *  put:
 *    tags:
 *      - Cars
 *    summary: Update a car by id.
 *    description: Update a car by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the car
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyCar'
 *    responses:
 *      200:
 *        description: A car.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 *
 * /cars:
 *  post:
 *    tags:
 *      - Cars
 *    summary: Add new car.
 *    description: Add new car.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyCar'
 *    responses:
 *      200:
 *        description: A car.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Car created successfully"
 *                car:
 *                  type: object
 *                  $ref: '#/components/schemas/Car'
 */

const express = require('express');
const router = express.Router();
const { deleteCar, getCar, getCars, newCar, updateCar } = require('../controllers/carController');
const { check } = require('express-validator');
const { isAdmin } = require('../middleware/role');

router.delete('/:id', deleteCar);

router.get('/:id', getCar);

router.get('/', getCars);

router.post(
  '/',
  isAdmin,
  [
    check('licensePlate', 'The license plate field is required').not().isEmpty(),
    check('brand', 'The brand field is required').not().isEmpty(),
    check('model', 'The model field is required').not().isEmpty(),
    check('year', 'The year field is required').not().isEmpty(),
    check('price', 'The price field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('color', 'The color field is required').not().isEmpty(),
    check('doors', 'The doors field is required').not().isEmpty(),
    check('fuel', 'The fuel field is required').not().isEmpty(),
    check('milage', 'The milage field is required').not().isEmpty()
  ],
  newCar
);

router.put('/:id', isAdmin, updateCar);

module.exports = router;
