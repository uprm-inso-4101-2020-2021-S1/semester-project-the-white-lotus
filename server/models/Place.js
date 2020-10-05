const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  comments: {
    type: Array
  },
  photos: {
    type: Array
  },
  hashtags: {
    type: Array
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
