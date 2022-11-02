const { Schema, model } = require('mongoose');

const DireccionSchema = new Schema({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true
  },
  number: {
    type: Number,
    required: [true, 'Number is required'],
    trim: true
  },
  floor: {
    type: Number,
    required: [true, 'Floor is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  province: {
    type: String,
    required: [true, 'Province is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  zipCode: {
    type: Number,
    required: [true, 'Zip code is required'],
    trim: true
  }
});

module.exports = model('Direccion', DireccionSchema);
