const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('licensePlate', 'The license plate field is required').not().isEmpty(),
    check('brand', 'The brand field is required').not().isEmpty(),
    check('model', 'The model field is required').not().isEmpty(),
    check('year', 'The year field is required').not().isEmpty(),
    check('price', 'The price field is required').not().isEmpty(),
    check('description', 'The description field is required').not().isEmpty(),
    check('color', 'The color field is required').not().isEmpty(),
    check('doorAmount', 'The door amount field is required').not().isEmpty(),
    check('fuelType', 'The year fuel type field is required').not().isEmpty(),
    check('milage', 'The milage field is required').not().isEmpty()
  ],
  autoController.newAuto
);

module.exports = router;
