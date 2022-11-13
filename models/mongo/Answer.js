const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema({
  advertisingId: {
    type: Schema.Types.ObjectId,
    required: [true, "AdvertisingId is required"],
  },
  commentId: {
    type: Schema.Types.ObjectId,
    required: [true, "CommentId is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    trim: true,
    default: Date.now(),
  },
  text: {
    type: String,
    required: [true, "Text is required"],
    trim: true,
  },
});

module.exports = model("Answer", AnswerSchema);
