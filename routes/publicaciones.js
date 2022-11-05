const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/publicacionController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('car', 'The car field is required').not().isEmpty(),
    check('payed', 'The payed field is required').not().isEmpty()
  ],
  clienteController.newPublicacion
);

module.exports = router;
