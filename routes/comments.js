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
