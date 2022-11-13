const Comment = require("../models/mongo/Comment");
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const Advertisement = require("../models/mongo/Advertisement");

/**
 * Get all comments from advertisement
 */
const getComments = async (req, res) => {
  try {
    const { advertisementId } = req.params;
    if (isValidObjectId(advertisementId)) {
      const comments = await Comment.find({ advertisementId });
      res.status(200).json(comments);
    } else {
      res.status(400).send("Invalid advertisement id");
    }
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

/**
 * Add new comment for advertisement
 */
const newComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    const { advertisementId } = req.params;

    if (isValidObjectId(advertisementId)) {
      const advertisement = await Advertisement.findById({
        _id: advertisementId,
      });

      if (advertisement) {
        const { text } = req.body;
        const comment = new Comment({ text, advertisementId });
        const commentSaved = await comment.save();

        await advertisement.updateOne({
          $push: { comments: commentSaved },
        });

        res.status(200).send({
          advertisementComments: [...advertisement.comments, commentSaved],
          newComment: commentSaved,
        });
      } else {
        res.status(400).send("Invalid advertisement id");
      }
    } else {
      res.status(400).send("Invalid advertisement id");
    }
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

module.exports = {
  getComments,
  newComment,
};
