const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authAdminController = require('../controllers/authAdminController');

router.post(
  '/',
  [
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.'
    ).isLength({ min: 8 })
  ],
  authAdminController.loginAdmin
);

module.exports = router;
