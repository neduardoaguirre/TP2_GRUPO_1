/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "636af9b732bdc95cd6db3592"
 *             __v:
 *               type: integer
 *               example: 0
 *         - $ref: '#/components/schemas/BodyAdmin'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BodyAdmin:
 *       type: object
 *       properties:
 *          email:
 *           type: string
 *           example: "test@test.com"
 *          password:
 *           type: string
 *           example: "Password1234"
 */

/**
 * @swagger
 *
 * /admin/{id}:
 *  delete:
 *    tags:
 *      - Admin
 *    summary: Delete admin by id.
 *    description: Delete admin by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the admin
 *    responses:
 *      200:
 *        description: If the operation was successfully return 200.
 */

/**
 * @swagger
 *
 * /admin:
 *  get:
 *    tags:
 *      - Admin
 *    summary: Get list of all admins.
 *    description: Get list of all admins.
 *    responses:
 *      200:
 *        description: A list of Admins.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Admin'
 */

/**
 * @swagger
 *
 * /admin/{id}:
 *  get:
 *    tags:
 *      - Admin
 *    summary: Get admin by id.
 *    description: Get admin by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the Admin
 *    responses:
 *      200:
 *        description: An admin.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 */

/**
 * @swagger
 *
 * /admin/{id}:
 *  put:
 *    tags:
 *      - Admin
 *    summary: Update Admin by id.
 *    description: Update Admin by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the admin
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyAdmin'
 *    responses:
 *      200:
 *        description: An Admin.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 */

/**
 * @swagger
 *
 * /admin:
 *  post:
 *    tags:
 *      - Admin
 *    summary: Create new Admin.
 *    description: Create new Admin.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyAdmin'
 *    responses:
 *      200:
 *        description: An Admin.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                admin:
 *                  type: object
 *                  $ref: '#/components/schemas/Admin'
 */

const express = require('express');
const router = express.Router();

const { getAdminById, getAllAdmin, createAdmin, deleteAdmin, updateAdmin } = require('../controllers/adminController');

const { check } = require('express-validator');

const { adminExists } = require('../helpers/db-validators');
const { validateFields } = require('../middleware/validate-fields');
const { isAdmin } = require('../middleware/role');
const auth = require('../middleware/auth');

//  ROUTES ------------------------

router.post(
  '/',
  [
    auth,
    isAdmin,
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces.'
    )
      .isLength({ min: 8 })
      .isLength({ max: 12 })
      .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
    validateFields
  ],
  createAdmin
);

router.get(
  '/:id',
  [auth, isAdmin, check('id', 'Please enter a valid id').isMongoId(), check('id').custom(adminExists), validateFields],
  getAdminById
);

router.get('/', [auth, isAdmin, validateFields], getAllAdmin);

router.put(
  '/:id',
  [
    auth,
    isAdmin,
    check('id', 'Please enter a valid id').isMongoId(),
    check('id').custom(adminExists),
    check('email', 'Please enter a valid email address').isEmail(),
    validateFields
  ],
  updateAdmin
);

router.delete(
  '/:id',
  [auth, isAdmin, check('id', 'Please enter a valid id').isMongoId(), check('id').custom(adminExists), validateFields],
  deleteAdmin
);

module.exports = router;
