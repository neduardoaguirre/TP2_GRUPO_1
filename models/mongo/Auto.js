const { Schema, model } = require('mongoose');

const AutoSchema = new Schema({
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  },
  doorAmount: {
    type: Number,
    required: [true, 'Door amount is required'],
    trim: true
  },
  fuelType: {
    type: String,
    required: [true, 'Fuel type is required'],
    trim: true
  },
  milage: {
    type: Number,
    required: [true, 'Milage is required'],
    trim: true
  }
});

module.exports = model('Auto', AutoSchema);
