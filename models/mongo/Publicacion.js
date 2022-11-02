const { Schema, model } = require('mongoose');

const PublicacionSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    trim: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comentario',
    required: [true, 'Comments are required']
  },
  payed: {
    type: Boolean,
    required: [true, 'Payed is required'],
    default: false
  }
});

module.exports = model('Publicacion', PublicacionSchema);
