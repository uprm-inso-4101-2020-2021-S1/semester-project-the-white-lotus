const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
  ownerID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
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
  mood: {
    type: Array,
    required: true
  },
  comments: {
    type: Array
  },
  photos: {
    type: Array,
    required: true
  },
  hashtags: {
    type: Array
  },
  ambience: {
    type: Array,
    required: true
  },
  maximumPrice: {
    type: String,
    required: true
  },
  minimumPrice: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
