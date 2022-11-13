// routes/comments.js

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
 *             answerId:
 *               type: string
 *               example: "6371309ed8e40d9ebd0842ff"
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

const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { check } = require("express-validator");

router.get("/:advertisementId", commentController.getComments);

router.post(
  "/:advertisementId",
  [check("text").not().isEmpty()],
  commentController.newComment
);

module.exports = router;
