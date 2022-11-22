const Advertisement = require("../models/Advertisement");
const Comment = require("../models/Comment");
const { isValidObjectId } = require("mongoose");

class CommentRepository {
  TAG = "CommentRepository -";

  /**
   * Delete comment from advertisement by comment id
   * @param commentId Comment id
   */
  async delete(commentId) {
    try {
      if (isValidObjectId(commentId)) {
        const comment = await Comment.findByIdAndDelete({ _id: commentId });

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

          return {
            msg: "Comment deleted successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid comment id",
            status: 400,
          };
        }
      } else {
        return {
          msg: "Invalid comment id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "delete - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Get all comments from advertisement by advertisement id from database
   * @param advertisementId Advertisement id
   */
  async get(advertisementId) {
    try {
      if (isValidObjectId(advertisementId)) {
        const comments = await Comment.find({ advertisementId });
        return {
          data: comments,
          msg: "Get comments successfully",
          status: 200,
        };
      } else {
        return {
          msg: "Invalid advertisement id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "get - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Save new answer to comment in advertisement
   * @param commentId Comment id
   * @param text Text of answer
   */
  async newAnswer(commentId, text) {
    try {
      if (isValidObjectId(commentId)) {
        const comment = await Comment.findById({
          _id: commentId,
        });

        if (comment) {
          if (comment.answer && Object.keys(comment.answer).length) {
            return {
              msg: "The comment id was already replied",
              status: 400,
            };
          } else {
            const advertisement = await Advertisement.findById({
              _id: comment.advertisementId,
            });

            if (advertisement) {
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

              return {
                data: {
                  advertisementComments: commentsUpdated,
                  updatedComment: updatedComment,
                },
                msg: "Add answer successfully",
                status: 200,
              };
            } else {
              return {
                msg: "Invalid comment id",
                status: 400,
              };
            }
          }
        } else {
          return {
            msg: "Invalid comment id",
            status: 400,
          };
        }
      } else {
        return {
          msg: "Invalid comment id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "newAnswer - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Save new comment in advertisement
   * @param advertisementId Advertisement id
   * @param text Text of comment
   */
  async newComment(advertisementId, text) {
    try {
      if (isValidObjectId(advertisementId)) {
        const advertisement = await Advertisement.findById({
          _id: advertisementId,
        });

        if (advertisement) {
          const comment = new Comment({ text, advertisementId });
          const commentSaved = await comment.save();

          await advertisement.updateOne({
            $push: { comments: commentSaved },
          });

          return {
            data: {
              advertisementComments: [...advertisement.comments, commentSaved],
              newComment: commentSaved,
            },
            msg: "Add comment successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid advertisement id",
            status: 400,
          };
        }
      } else {
        return {
          msg: "Invalid advertisement id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "newComment - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }
}

module.exports = new CommentRepository();
