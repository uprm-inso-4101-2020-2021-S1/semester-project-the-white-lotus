const express = require('express');

const router = express.Router();
const { to } = require('../utils');

// Place model
const Place = require('../../models/Place');

// Get all places
router.get('/all/', async (req, res) => {
  const places = await Place.find();

  res.send(places);
});

// Create a place
router.post('/new/', async (req, res) => {
  const place = new Place({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    photos: req.body.photos,
    hashtags: req.body.hashtags,
    ambience: req.body.ambience,
    category: req.body.category,
    maximumPrice: req.body.maximumPrice,
    minimumPrice: req.body.minimumPrice
  });

  await place.save();

  res.send(place);
});

// Get individual place
router.get('/:id', async (req, res, next) => {
  const [err, place] = await to(Place.findOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If place w/ id is not found, return 'not found'
  if (!place) {
    res.status(404);
    return res.send({
      msg: 'Place not found'
    });
  }

  return res.send(place);
});

// Get individual place by name
router.get('/name/:name', async (req, res, next) => {
  const [err, place] = await to(Place.findOne({ name: req.params.name }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If place w/ id is not found, return 'not found'
  if (!place) {
    res.status(404);
    return res.send({
      msg: 'Place not found'
    });
  }

  return res.send(place);
});

// Update individual place
router.patch('/update/:id', async (req, res, next) => {
  const [err, place] = await to(Place.findOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If place w/ id is not found, return 'not found'
  if (!place) {
    res.status(404);
    return res.send({
      msg: 'Place not found'
    });
  }

  // Update attributes
  if (req.body.name) {
    place.name = req.body.name;
  }
  if (req.body.email) {
    place.email = req.body.email;
  }
  if (req.body.phone) {
    place.phone = req.body.phone;
  }
  if (req.body.address) {
    place.address = req.body.address;
  }
  if (req.body.city) {
    place.city = req.body.city;
  }
  if (req.body.country) {
    place.country = req.body.country;
  }
  if (req.body.photos) {
    place.photos = req.body.photos;
  }
  if (req.body.hashtags) {
    place.hashtags = req.body.hashtags;
  }
  if (req.body.ambience) {
    place.ambience = req.body.ambience;
  }
  if (req.body.minimumPrice) {
    place.minimumPrice = req.body.minimumPrice;
  }
  if (req.body.maximumPrice) {
    place.maximumPrice = req.body.maximumPrice;
  }
  if (req.body.category) {
    place.category = req.body.category;
  }
  await place.save();

  return res.send(place);
});

// Delete individual place
router.delete('/delete/:id', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(Place.deleteOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If n is zero, the post was deleted
  if (!result.n) {
    res.status(404);
    return res.send({
      msg: 'Place not found'
    });
  }

  return res.send(result);
});

// Delete individual place by name
router.delete('/delete/name/:name', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(Place.deleteOne({ name: req.params.name }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If n is zero, the post was deleted
  if (!result.n) {
    res.status(404);
    return res.send({
      msg: 'Place not found'
    });
  }

  return res.send(result);
});

module.exports = router;
