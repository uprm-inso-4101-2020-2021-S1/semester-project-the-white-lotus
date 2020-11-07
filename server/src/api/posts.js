const express = require('express');

const router = express.Router();
const { to } = require('../utils');

// Post model
const Post = require('../../models/Posts');

/**
 * @swagger
 * /posts:
 *  get:
 *    summary: Use to request all posts
 *    description: Get all posts stored from database in an array
 *    tags:
 *      - posts
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: An internal server error ocurred
 *
*/
// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

/**
 * @swagger
 * /posts:
 *  post:
 *    summary: Use to create a post
 *    description: Create a post and save to database link with user
 *    tags:
 *      - posts
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: An internal server error ocurred
 *
*/
// Create a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  await post.save();

  res.send(post);
});


/**
 * @swagger
 * /posts/{id}:
 *  get:
 *    summary: Use to get an individual post by id
 *    description: Uses the id variable at the end of the path to identify and retrieve a specific post
 *    tags:
 *      - posts
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the post to get
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Post was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
// Get individual post
router.get('/:id', async (req, res, next) => {
  const [err, post] = await to(Post.findOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If post w/ id is not found, return 'not found'
  if (!post) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  res.send(post);
});

/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *    summary: Use to update a post
 *    description: Updates a specific post by id, replacing the users attributes with those given in the request body
 *    tags:
 *      - posts
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the post to update
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Post was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
// Update individual post
router.patch('/:id', async (req, res, next) => {
  const [err, post] = await to(Post.findOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If post w/ id is not found, return 'not found'
  if (!post) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  // Update attributes
  if (req.body.title) {
    post.title = req.body.title;
  }

  if (req.body.content) {
    post.content = req.body.content;
  }

  await post.save();

  res.send(post);
});

/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *    summary: Use to delete a post
 *    description: Deletes a specific post by id, removing post from database
 *    tags:
 *      - posts
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the post to delete
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Post was not found
 *      '500':
 *        description: An internal server error ocurred
 *
*/
// Delete individual post
router.delete('/:id', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(Post.deleteOne({ _id: req.params.id }));

  // If an error occurred, throw to handler
  if (err) {
    return next(err);
  }

  // If n is zero, the post was deleted
  if (!result.n) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  res.send(result);
});

module.exports = router;
