/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "636af9b732bdc95cd6db3592"
 *             __v:
 *               type: integer
 *               example: 0
 *             advertisementId:
 *               type: string
 *               example: "636afa175b190c4bbb0145cf"
 *             answer:
 *               $ref: '#/components/schemas/Answer'
 *             date:
 *               type: date
 *               example: "2022-11-13T18:02:25.319Z"
 *           required:
 *             - advertisementId
 *             - date
 *         - $ref: '#/components/schemas/BodyComment'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "636af9b732bdc95cd6db3592"
 *         date:
 *           type: date
 *           example: "2022-11-13T18:02:25.319Z"
 *         text:
 *           type: string
 *           example: "Comment test"
 *       required:
 *         - date
 *         - text
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BodyComment:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Comment test"
 *       required:
 *         - text
 */

/**
 * @swagger
 *
 * /comments/{id}:
 *  delete:
 *    tags:
 *      - Comments
 *    summary: Delete comment by id.
 *    description: Delete comment by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        requerid: true
 *        description: Id of the comment
 *    responses:
 *      200:
 *        description: If the operation was successfully return 200.
 */

/**
 * @swagger
 *
 * /comments/{advertisementId}:
 *  get:
 *    tags:
 *      - Comments
 *    summary: Get all comments from advertisement.
 *    description: Get all comments from advertisement.
 *    parameters:
 *      - in: path
 *        name: advertisementId
 *        requerid: true
 *        description: Id of the advertisement
 *    responses:
 *      200:
 *        description: A list of comments.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 *
 * /comments/{advertisementId}:
 *  post:
 *    tags:
 *      - Comments
 *    summary: Add new comment to advertisement.
 *    description: Add new comment to advertisement.
 *    parameters:
 *      - in: path
 *        name: advertisementId
 *        requerid: true
 *        description: Id of the advertisement
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyComment'
 *    responses:
 *      200:
 *        description: A advertisement with new comment.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                advertisementComments:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Comment'
 *                newComment:
 *                  $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 *
 * /comments/reply/{commentId}:
 *  post:
 *    tags:
 *      - Comments
 *    summary: Add new reply to comment.
 *    description: Add new reply to comment.
 *    parameters:
 *      - in: path
 *        name: commentId
 *        requerid: true
 *        description: Id of the comment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyComment'
 *    responses:
 *      200:
 *        description: A advertisement with new comment.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                advertisementComments:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Comment'
 *                updatedComment:
 *                  $ref: '#/components/schemas/Comment'
 */

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.delete('/:id', auth, commentController.deleteComment);

router.get('/:advertisementId', auth, commentController.getComments);

router.post('/:advertisementId', auth, [ check('text').not().isEmpty() ], commentController.newComment);

router.post('/reply/:commentId', auth, [ check('text').not().isEmpty() ], commentController.newAnswer);

module.exports = router;
