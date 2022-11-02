const { Schema, model } = require('mongoose');

const ClienteSchema = new Schema({
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
    type: Array,
    required: [true, 'History of search is required']
  },
  favorites: {
    type: Array,
    required: [true, 'Favorites is required']
  },
  downPaymentCars: {
    type: Array
  }
});

module.exports = model('Cliente', ClienteSchema);
