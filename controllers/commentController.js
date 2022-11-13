const Comment = require("../models/mongo/Comment");
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const Advertisement = require("../models/mongo/Advertisement");

/**
 * Delete comment by id
 */
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const comment = await Comment.findByIdAndDelete({ _id: id });

      if (comment) {
        const advertisement = await Advertisement.findById({
          _id: comment.advertisementId,
        });

        const commentsUpdated = advertisement.comments.filter(
          (c) => c._id.toString() !== comment.id
        );

        await advertisement.updateOne({
          comments: commentsUpdated,
        });

        res.status(200).send("Comment deleted successfully");
      } else {
        res.status(400).send("Invalid comment id");
      }
    } else {
      res.status(400).send("Invalid comment id");
    }
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

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
 * Add new answer for comment
 */
const newAnswer = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    const { commentId } = req.params;

    if (isValidObjectId(commentId)) {
      const comment = await Comment.findById({
        _id: commentId,
      });

      if (comment) {
        if (comment.answer && Object.keys(comment.answer).length) {
          res.status(400).send("The comment id was already replied");
        } else {
          const advertisement = await Advertisement.findById({
            _id: comment.advertisementId,
          });

          if (advertisement) {
            const { text } = req.body;
            const answer = {
              date: new Date(),
              text,
            };

            await comment.updateOne({
              answer,
            });

            let updatedComment = null;
            const commentsUpdated = advertisement.comments.map((c) => {
              if (c._id.toString() === comment.id) {
                c.answer = answer;
                updatedComment = c;
              }
              return c;
            });

            await advertisement.updateOne({
              comments: commentsUpdated,
            });

            res.status(200).send({
              advertisementComments: commentsUpdated,
              updatedComment: updatedComment,
            });
          } else {
            res.status(400).send("Invalid comment id");
          }
        }
      } else {
        res.status(400).send("Invalid comment id");
      }
    } else {
      res.status(400).send("Invalid comment id");
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
  deleteComment,
  getComments,
  newAnswer,
  newComment,
};
