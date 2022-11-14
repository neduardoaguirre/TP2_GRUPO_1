const express = require('express');
const router = express.Router();

const {
  getAdminById,
  getAllAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin
} = require('../controllers/adminController');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { adminExists } = require('../helpers/db-validators');

//  ROUTES ------------------------

router.post('/', [
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.')
    .isLength({ min: 8 })
    .isLength({ max: 12 })
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
  validateFields
], createAdmin)

router.get('/:id', [
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  validateFields,
], getAdminById)

router.get('/', [
  validateFields,
], getAllAdmin)


router.put('/:id', [
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  check('email', 'Please enter a valid email address').isEmail(),
  check(
    'password',
    'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.'
  )
    .isLength({ min: 8 })
    .isLength({ max: 12 })
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
  validateFields,
], updateAdmin)

router.delete('/:id', [
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  validateFields,
], deleteAdmin)

module.exports = router;
