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
  payed: {
    type: Boolean,
    required: [ true, 'Payed is required' ],
    default: false
  }
});

module.exports = model('Advertisement', AdvertisementSchema);
