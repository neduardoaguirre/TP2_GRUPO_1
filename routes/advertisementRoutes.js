/**
 * @swagger
 * components:
 *   schemas:
 *     Advertisements:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "636af9b732bdc95cd6db3592"
 *             __v:
 *               type: integer
 *               example: 0
 *         - $ref: '#/components/schemas/BodyAdvertisement'
 */

/**
 *
 * @swagger
 *
 * /advertisements:
 *  post:
 *    tags:
 *      - Advertisements
 *    summary: Add new advertisement.
 *    description: Add new advertisement.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyAdvertisement'
 *    responses:
 *      200:
 *        description: An advertisement.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Advertisement created successfully"
 *                advertisement:
 *                  type: object
 *                  $ref: '#/components/schemas/Advertisement'
 */


/**
 * @swagger
 *
 * /advertisements:
 *  get:
 *    tags:
 *      - Advertisements
 *    summary: Get list of all advertisements.
 *    description: Get list of all advertisements.
 *    responses:
 *      200:
 *        description: A list of advertisements.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Advertisement'
 */



/**
* @swagger
*
* /advertisements/{id}:
*  get:
*    tags:
*      - Advertisements
*    summary: Get an advertisement by id.
*    description: Get an advertisement by id.
*    parameters:
*      - in: path
*        name: id
*        requerid: true
*        description: Id of the advertisement
*    responses:
*      200:
*        description: An advertisement.
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Advertisement'
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     BodyAdvertisement:
 *       type: object
 *       properties:
 *        car:
 *           type: object
 *           example:
 *              licensePlate: "AE788EB"
 *              brand: "Toyota"
 *              model: "Yaris"
 *              year: 2022
 *              price: 2500000
 *              description: "Full con ABS"
 *              image: "https://www.jeep.com.ar/content/dam/cross-regional/latam/jeep/es_ar/bhp/lineup/Jeep-Renegade-2022-new.jpg.img.300.jpg"
 *              color: "Gris"
 *              doors: 5
 *              fuel: "Nafta"
 *              milage: 1000
 *        date:
 *            type: date
 *            example: "2022-11-13T18:02:25.319Z"
 *        comments:
 *            type: array
 *        payed:
 *            type: boolean
 *            example: true
 *        title:
 *            type: string
 *            example: "Toyota Yaris a la venta"
 *        description:
 *            type: string
 *            example: "Auto nuevo 0 km"
 *        location:
 *            type: string
 *            example: "Recoleta, CABA"
 *       required:
 *         - car
 *         - date
 *         - title
 *         - location
 */

/**
 * @swagger
 *
 * /advertisements/{id}:
 *  put:
 *    tags:
 *      - Advertisements
 *    summary: Update an advertisement by id.
 *    description: Update an advertisement by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the advertisement
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyAdvertisement'
 *    responses:
 *      200:
 *        description: An advertisement.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Advertisement'
 */

/**
 * @swagger
 *
 * /advertisements/{id}:
 *  delete:
 *    tags:
 *      - Advertisements
 *    summary: Delete an advertisement by id.
 *    description: Delete an advertisement by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the advertisement
 *    responses:
 *      200:
 *        description: If the operation was successfully return 200.
 */


const express = require('express');
const router = express.Router();
const { getAdvertisementById, updateAdvertisementById, deleteAdvertisementById, getAllAdvertisements, newAdvertisement } = require('../controllers/advertisementController');
const { check } = require('express-validator');
const { isAdmin } = require('../middleware/role');
const { validateFields } = require('../middleware/validate-fields');

router.get('/:id',
  [
    check('id', 'Please enter a valid id').isMongoId(),
  ], getAdvertisementById);

router.get('/', getAllAdvertisements);

router.post(
  '/',
  isAdmin,
  [
    check('car', 'The car field is required').not().isEmpty(),
    check('payed', 'The payed field is required').not().isEmpty(),
    validateFields
  ],
  newAdvertisement
);

router.put('/:id', isAdmin, updateAdvertisementById);

router.delete('/:id', isAdmin, deleteAdvertisementById);

module.exports = router;

