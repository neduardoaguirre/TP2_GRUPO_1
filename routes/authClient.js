// routes/authClient.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       allOf:
 *         - type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "test@test.com"
 *             password:
 *               type: string
 *               example: "Pass1234"
 *         - $ref: '#/components/schemas/LoginClientBody'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginClientBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "testClient@test.com"
 *         password:
 *           type: string
 *           example: "Pass1234"
 */

/**
 * @swagger
 *
 * /client_login:
 *  post:
 *    tags:
 *      - Auth Client
 *    summary: Login as an Client.
 *    description: Login as an Client with email and password.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginClientBody'
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
