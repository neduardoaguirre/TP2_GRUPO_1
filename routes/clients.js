const express = require('express');
const router = express.Router();
const { getClient, getAllClients, newClient, updateClient, deleteClient } = require('../controllers/clientController');
const { check } = require('express-validator');

router.get('/:id', getClient);

router.get('/', getAllClients);

router.post(
  '/',
  [
    check('name', 'The Name field is required').not().isEmpty(),
    check('surname', 'The Surname field is required').not().isEmpty(),
    check('dni', 'The DNI field is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.'
    )
      .isLength({ min: 8 })
      .isLength({ max: 12 })
      .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/)
  ],
  newClient
);

router.put('/:id', updateClient)

router.delete('/:id', deleteClient)

module.exports = router;
