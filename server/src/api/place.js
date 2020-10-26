const express = require('express');

const router = express.Router();
const { to } = require('../utils');

// Place model
const Place = require('../../models/Place');

/**
 * @swagger
 * /place/all/:
 *  get:
 *    summary: Use to request all places
 *    description: Get all places stored from database in an array
 *    tags:
 *      - place
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: An internal server error occurred
 *
 */
router.get('/all/', async (req, res) => {
  const places = await Place.find();

  res.send(places);
});

// /**
//  * @swagger
//  * /place/new/:
//  *  post:
//  *    summary: Use to create a place
//  *    description: Create a place and save to database link with user
//  *    tags:
//  *      - places
//  *    requestBody:
//  *      name: <p>name</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: Rumba
//  *      email: <p>email</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: rumba@eat.com
//  *      phone: <p>phone</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: 7873060306
//  *      longitude: <p>longitude</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: 40.7143528
//  *      latitude: <p>latitude</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: 40.7143528
//  *      address: <p>address</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: Carr 455 Km. 11.7
//  *      city: <p>city</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: Ciudad Langosta
//  *      country: <p>country</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: Treasure Island
//  *      mood: <p>mood</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: array
//  *          example: ['Happy', 'Sad']
//  *      comments: <p>comments</p>
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: array
//  *          example: ['This is a', 'comment']
//  *      photos: <p>photos</p>
//  *      hashtags: <p>hashtags</p>
//  *      ambience: <p>ambience</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: array
//  *          example: ['Calm', 'Serene']
//  *      maximumPrice: <p>maximumPrice</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: 35
//  *      minimumPrice: <p>minimumPrice</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: 60
//  *      category: <p>category</p>
//  *      required:true
//  *      content:
//  *        text/plain:
//  *          schema:
//  *            type: string
//  *          example: Nature
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  *      '500':
//  *        description: An internal server error occurred
//  */
router.post('/new/', async (req, res) => {
  const place = new Place({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    mood: req.body.mood,
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

// Get place using filter
router.get('/filter/', async (req, res, next) => {
  const filter = {
    mainCategory: req.body.mainCategory,
    ambience: req.body.ambience,
    mood: req.body.mood,
    currentLocation: req.body.currentLocation,
    preferredDistance: req.body.preferredDistance,
    budget: req.body.budget
  };
  const [err, places] = await to(Place
    .find({
      maximumPrice: { $lte: filter.budget[1] },
      minimumPrice: { $gte: filter.budget[0] },
      // TODO: Location
      category: filter.mainCategory,
      ambience: { $all: [filter.ambience] },
      mood: { $all: [filter.mood] }
    }));
  const randomIndex = Math.floor(Math.random() * Math.floor(places.length));
  const place = places[randomIndex];
  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }
  // If no place corresponds to the filter specifications, return 'not found'
  if (!place) {
    res.status(404);
    return res.send({
      msg: 'No place was found that matches the request. Try again!'
    });
  }
  return res.send(place);
});

// Get individual place by id
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

// Update individual place by id
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
  if (req.body.longitude) {
    place.longitude = req.body.longitude;
  }
  if (req.body.latitude) {
    place.latitude = req.body.latitude;
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
  if (req.body.mood) {
    place.mood = req.body.mood;
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

// Delete individual place by id
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

// Delete all places
router.delete('/delete_all/', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(Place.remove());

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If n is zero, the post was deleted
  if (!result.n) {
    res.status(404);
    return res.send({
      msg: 'There are no places to delete.'
    });
  }

  return res.send(result);
});

module.exports = router;
