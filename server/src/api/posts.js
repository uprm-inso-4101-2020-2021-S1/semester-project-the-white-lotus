const express = require("express");
const router = express.Router();
const to = require('../utils').to;

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
 *      description: <p>my description</p> 
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

// Get individual post
router.get('/:id', async (req, res, next) => {

  const [err, post] = await to(Post.findOne({_id: req.params.id}));
  
  // If an error occurred, throw to handler
  if(err) {
    return next(err);
  }

  // If post w/ id is not found, return 'not found'
  if(!post) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  res.send(post);
});

// Update individual post
router.patch('/:id', async (req, res, next) => {

  const [err, post] = await to(Post.findOne({_id: req.params.id}));
  
  // If an error occurred, throw to handler
  if(err) {
    return next(err);
  }

  // If post w/ id is not found, return 'not found'
  if(!post) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  // Update attributes
  if(req.body.title) {
    post.title = req.body.title;
  }

  if(req.body.content) {
    post.content = req.body.content;
  }

  await post.save();

  res.send(post);
});

// Delete individual post
router.delete('/:id', async (req, res, next) => {

  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(Post.deleteOne({_id: req.params.id}));
  
  // If an error occurred, throw to handler
  if(err) {
    return next(err);
  }

  // If n is zero, the post was deleted
  if(!result.n) {
    res.status(404);
    return res.send({
      msg: 'Post not found'
    });
  }

  res.send(result);
});

module.exports = router