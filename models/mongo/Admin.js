const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
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
    default: 'admin'
  }
});

module.exports = model('Admin', AdminSchema);
