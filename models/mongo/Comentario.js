const { Schema, model } = require('mongoose');

const CommentarioSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  },
  responses: {
    type: Schema.Types.ObjectId,
    ref: 'Response',
    required: [true, 'Responses are required']
  }
});

module.exports = model('Comentario', CommentarioSchema);
