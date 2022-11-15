const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    default: 'client'
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true
  },
  dni: {
    type: Number,
    required: [true, 'DNI is required'],
    trim: true
  },
  historyOfSearch: {
    type: Array
  },
  favorites: {
    type: Array
  },
  downPaymentCars: {
    type: Array
  }
});

module.exports = model('Client', ClientSchema);
