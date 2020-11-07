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
 *      - places
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
/**
 * @swagger
 * /place/{id}:
 *  get:
 *    summary: Use to get an individual place by id
 *    description: Uses the id variable at the end of the path to identify and retrieve a specific place
 *    tags:
 *      - places
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the place to get
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Place was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
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

/**
 * @swagger
 * /place/name/{name}:
 *  get:
 *    summary: Use to get an individual place by name
 *    description: Uses the name variable at the end of the path to identify and retrieve a specific place
 *    tags:
 *      - places
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        //required: true
 *        description: Name of the place to get
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Place was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
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

/**
 * @swagger
 * /place/filter:
 *  get:
 *    summary: Use to get a list of places based on filters
 *    description: Uses attributes from the JSON in the request body to filter potential places
 *    tags:
 *      - places
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Place-Filter'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: No place was found that matches the request.
 *      '500':
 *        description: An internal server error ocurred
 *
 */
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
/**
 * @swagger
 * /place/new/:
 *  post:
 *    summary: Use to create a place
 *    description: Create a place and save to database link with user
 *    tags:
 *      - places
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Place'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: An internal server error occurred
 */
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
    comments: req.body.comments,
    category: req.body.category,
    maximumPrice: req.body.maximumPrice,
    minimumPrice: req.body.minimumPrice
  });

  await place.save();

  res.send(place);
});
/**
 * @swagger
 * /place/update/{id}:
 *  patch:
 *    summary: Use to update a place
 *    description: Updates a specific place by id, updating the objects attributes with those given in the request body
 *    tags:
 *      - places
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the place to update
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Place'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Place was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
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

/**
 * @swagger
 * /place/delete/{id}:
 *  delete:
 *    summary: Use to delete a place by id
 *    description: Deletes a specific place by id, removing the place from database
 *    tags:
 *      - places
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the place to delete
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Place was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
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

/**
 * @swagger
 * /place/delete/name/{name}:
 *  delete:
 *    summary: Use to delete a place by name
 *    description: Deletes a specific place by name, removing the place from database
 *    tags:
 *      - places
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        //required: true
 *        description: Name of the place to delete
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Place was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
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

// /**
//  * @swagger
//  * /place/delete_all:
//  *  delete:
//  *    summary: Use to delete ALL places in database
//  *    security:
//  *      - OAuth2: [admin]
//  *    description: Deletes all places from database, effectively clearing out all entries
//  *    tags:
//  *      - places
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  *      '401':
//  *        description: Not authorized
//  *      '404':
//  *        description: No places found to delete
//  *      '500':
//  *        description: An internal server error ocurred
//  *
// */
// Delete all places
router.delete('/delete_all/', async (req, res, next) => {
  res.status(401);
  return res.send({
    msg: 'Not authorized'
  });
  //
  // const [err, result] = await to(Place.remove());
  //
  // // If an error occurred, throw to handler
  // if (err) {
  //   return next(err);
  // }
  //
  // // If n is zero, the post was deleted
  // if (!result.n) {
  //   res.status(404);
  //   return res.send({
  //     msg: 'There are no places to delete.'
  //   });
  // }
  // return res.send(result);
});

module.exports = router;
