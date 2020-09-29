const express = require("express");
const router = express.Router();
const to = require('../utils').to;

// User registration authorization
const AuthController = require('../../controllers/AuthController')

// router.get('/', (req, res) => {
//   res.json({
//     msg: 'In user!!!'
//   });
// });

// User model
const User = require('../../models/User');

// Get all users
router.get('/all', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

// User Register
router.post('/register', AuthController.register)

// User login
router.post('/login', AuthController.login)

// Get an individual user
router.get('/:id', async (req, res, next) => {
  const [err, user] = await to(User.findOne({_id: req.params.id}))

  // If an error ocurred, throw to handler
  if(err) {
    return next(err)
  }

  // If user w/ id is not found, return 'not found'
  if(!user) {
    res.status(404)
    return res.send({
      msg: 'User not found.'
    })
  }

  // Found user
  res.send(user)
})

// Update individual user
router.patch('/update/:id', async (req, res, next) => {
  const [err, user] = await to(User.findOne({_id: req.params.id}))

  // If an error ocurred, throw to handler
  if(err) {
    return next(err)
  }

  // If user w/ id is not found, return 'not found'
  if(!user){
    res.status(404)
    return res.send({
      msg: 'User not found'
    })
  }

  /* Update attributes (not allowing email change for now since
     it is unique) */
  if(req.body.name){
    user.name = req.body.name
  }
  if(req.body.address){
    user.address = req.body.address
  }
  if(req.body.phone){
    user.phone = req.body.phone
  }
  if(req.body.ishost){
    user.ishost = req.body.ishost
  }
  if(req.body.comment){
    user.commenthistory.push({
      place: req.body.comment.place,
      date: Date.now(),
      comment: req.body.comment.comment
    })
  }
  if(req.body.hashtags){
    user.hashtags.push(req.body.hashtags)
  }

  //TODO: Update password

  // Save and send updated user
  await user.save()
  res.send(user)
})

// Delete an individual user
router.delete('/delete/:id', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  // ok – 1 if the operation was successful
  // deletedCount – number of documents deletedCount
  const [err, result] = await to(User.deleteOne({_id: req.params.id}))

  // If an error ocurred 
  if(err) {
    return next(err)
  }

  // If result.n is zero, the user was deleted
  if(!result.n){
    res.status(404)
    return res.send({
      msg: 'User was not found.'
    })
  }

  // User was deleted successfully, send result
  res.send({
    result,
    msg: `User ${req.params.id} deleted successfully.`
  })
})

module.exports = router