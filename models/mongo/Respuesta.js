const { Schema, model } = require('mongoose');

const RespuestaSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Date is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  }
});

module.exports = model('Respuesta', RespuestaSchema);
