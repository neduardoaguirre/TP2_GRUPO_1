// routes/authAdmin.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       allOf:
 *         - type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "test@test.com"
 *             password:
 *               type: string
 *               example: "Pass1234"
 *         - $ref: '#/components/schemas/LoginAdminBody'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginAdminBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "testAdmin@test.com"
 *         password:
 *           type: string
 *           example: "Pass1234"
 */

/**
 * @swagger
 *
 * /admin_login:
 *  post:
 *    tags:
 *      - Auth Admin
 *    summary: Login as an Admin.
 *    description: Login as an Admin with email and password.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginAdminBody'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Login successfully"
 *                token:
 *                  type: string
 */

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
