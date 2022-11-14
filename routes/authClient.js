const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authClientController = require('../controllers/authClientController');

router.post(
  '/',
  [
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.'
    ).isLength({ min: 8 })
  ],
  authClientController.loginClient
);

module.exports = router;
