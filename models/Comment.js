const { Schema, model } = require("mongoose");

const baseComment = {
  date: {
    type: Date,
    required: [ true, "Date is required" ],
    trim: true,
    default: Date.now(),
  },
  text: {
    type: String,
    required: [ true, "Text is required" ],
    trim: true,
  },
};

const CommentSchema = new Schema({
  advertisementId: {
    type: Schema.ObjectId,
    required: [ true, "AdvertisingId is required" ],
  },
  ...baseComment,
  answer: {
    type: baseComment,
    required: [ false ],
  },
});

module.exports = model("Comment", CommentSchema);
