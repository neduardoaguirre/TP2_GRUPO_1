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

const { adminExists } = require('../helpers/db-validators');
const { validateFields } = require('../middleware/validate-fields');
const { isAdmin } = require('../middleware/role');

//  ROUTES ------------------------

router.post('/', [
  isAdmin,
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.')
    .isLength({ min: 8 })
    .isLength({ max: 12 })
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
  validateFields
], createAdmin)

router.get('/:id', [
  isAdmin,
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  validateFields,
], getAdminById)

router.get('/', [
  isAdmin,
  validateFields,
], getAllAdmin)


router.put('/:id', [
  isAdmin,
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  check('email', 'Please enter a valid email address').isEmail(),
  validateFields,
], updateAdmin)

router.delete('/:id', [
  isAdmin,
  check('id', 'Please enter a valid id').isMongoId(),
  check('id').custom(adminExists),
  validateFields,
], deleteAdmin)

module.exports = router;
