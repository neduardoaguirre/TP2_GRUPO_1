const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    trim: true,
    default: Date.now()
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  }
});

module.exports = model('Comment', CommentSchema);
