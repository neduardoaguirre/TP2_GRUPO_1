/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "636af9b732bdc95cd6db3592"
 *             __v:
 *               type: integer
 *               example: 0
 *         - $ref: '#/components/schemas/BodyClient'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BodyClient:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "example@gmail.com"
 *         password:
 *           type: string
 *           example: "1234"
 *         role:
 *           type: string
 *           example: "admin"
 *         name:
 *           type: string
 *           example: "Juan"
 *         surname:
 *           type: string
 *           example: "Perez"
 *         dni:
 *           type: number
 *           example: 11222333
 *         historyOfSearch:
 *           type: array
 *           example: []
 *         favorites:
 *           type: array
 *           example: []
 *         downPaymentCars:
 *           type: array
 *           example: []
 *       required:
 *         - email
 *         - password
 *         - role
 *         - name
 *         - surname
 *         - dni
 */
const express = require('express');
const router = express.Router();
const { getClient, getAllClients, newClient, updateClient, deleteClient } = require('../controllers/clientController');
const { check } = require('express-validator');
const { isAdmin } = require('../middleware/role');


/**
 * @swagger
 *
 * /clients/{id}:
 *  get:
 *    tags:
 *      - Clients
 *    summary: Get a client by id.
 *    description: Get a client by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the client
 *    responses:
 *      200:
 *        description: A client.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 */
router.get('/:id', isAdmin, getClient);

/**
 * @swagger
 *
 * /clients:
 *  get:
 *    tags:
 *      - Clients
 *    summary: Get list of all clients.
 *    description: Get list of all clients.
 *    responses:
 *      200:
 *        description: A list of clients.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 */
router.get('/', isAdmin, getAllClients);

/**
 * @swagger
 *
 * /clients:
 *  post:
 *    tags:
 *      - Clients
 *    summary: Add new client.
 *    description: Add new client.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyClient'
 *    responses:
 *      200:
 *        description: A client.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Client created successfully"
 *                client:
 *                  type: object
 *                  $ref: '#/components/schemas/Client'
 */
router.post(
  '/',
  isAdmin,
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

/**
 * @swagger
 *
 * /clients/{id}:
 *  put:
 *    tags:
 *      - Clients
 *    summary: Update a client by id.
 *    description: Update a client by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the client
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyClient'
 *    responses:
 *      200:
 *        description: A client.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 */
router.put('/:id', isAdmin, updateClient);

/**
 * @swagger
 *
 * /clients/{id}:
 *  delete:
 *    tags:
 *      - Clients
 *    summary: Delete a client by id.
 *    description: Delete a client by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the client
 *    responses:
 *      200:
 *        description: If the operation was successfully return 200.
 */
router.delete('/:id', isAdmin, deleteClient);

module.exports = router;
