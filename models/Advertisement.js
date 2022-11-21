const { Schema, model } = require('mongoose');

const AdvertisementSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: [ true, 'Car is required' ]
  },
  date: {
    type: Date,
    required: [ true, 'Date is required' ],
    trim: true,
    default: Date.now()
  },
  comments: [ {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  } ],
  paid: {
    type: Boolean,
    required: [ true, 'Paid is required' ],
    default: false
  }, 
  title: {
    type: String,
    required: [ true, 'Title is required' ]
  },
  description: {
    type: String,
    required: [ false ]
  },
  location: {
    type: String,
    required: [ true, 'Location is required' ],
  }
});

module.exports = model('Advertisement', AdvertisementSchema);
