const express = require("express");
const router = express.Router();
const to = require('../utils').to;
const bcrypt = require('bcryptjs')

// User registration authorization
const AuthController = require('../../controllers/AuthController')

// User model
const User = require('../../models/User');

/**
 * Getting All Users
 * Simple function that returns all the current users
 * that are within the Data Base. 
 * 
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/all
 */
router.get('/all', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

/**
 * User Registration
 * This function calls directly the authentication
 * controller for the register function of a new user.
 *
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/register
 * 
 * For detailed information go to 
 * repo/server/controllers/AuthController
 */
router.post('/register', AuthController.register)

/**
 * User Login
 * This function calls directly the authentication
 * controller for the login function of an existing user.
 *
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/login
 *
 * For detailed information go to 
 * repo/server/controllers/AuthController
 */
router.post('/login', AuthController.login)

/**
 * Get User by ID (individual)
 * This function returns a specified user by ID. If
 * the ID does not exist in the Data Base then the
 * function will return a 'User not found.' message.
 * 
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/:id
 * 
 * Where :id is replaced by the actual ID of the user
 * Example: host/api/v2/user/5f73377e556c7bf80113cfe4
 */
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

/**
 * Updating User's attributes
 * The function takes care of updating the attributes
 * of a single user by checking which parameters were
 * given first and then assigning it to the ones 
 * currently saved on the Data Base.
 * 
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/update/:id
 * 
 * Where :id is replaced the actual ID of the user that is
 * going to get the attributes update.
 * Example:
 * {
 *  "name": "Manuel Bobo",
 *  "phone": "787-225-0909",
 *  "comment": {
 *    "place": "5f7364fa0a33bb1b640f96b4",
 *    "comment": "Best Burger I've had in years!"
 *  }
 * }
 * 
 * Note that to update the comment attribute is different. Refer
 * to the User model under 
 * repo/server/models/User
 * for more information.
 */
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
  //Updating User name
  if(req.body.name){
    user.name = req.body.name
  }

  //Updating User address
  if(req.body.address){
    user.address = req.body.address
  }

  //Updating User phone
  if(req.body.phone){
    user.phone = req.body.phone
  }

  //Updating user host status
  if(req.body.ishost){
    user.ishost = req.body.ishost
  }

  //Updating User comment history
  if(req.body.comment){
    user.commenthistory.push({
      place: req.body.comment.place,
      date: String(new Date()),
      comment: req.body.comment.comment
    })
  }

  //Updating User hashtag list
  if(req.body.hashtags){
    if(!user.hashtags.includes(req.body.hashtags)){
      user.hashtags.push(req.body.hashtags)
    }
  }

  //Updating User password
  var passErr = false; //Purpose of sending the right response
  if(req.body.newpassword){ //Password change requested
    if(req.body.newpassword2){ //Password confirmation
      if(req.body.newpassword === req.body.newpassword2){ //Make sure both passwords are a match
        //To change the password, User has to put the current password
        bcrypt.compare(req.body.currentpassword, user.password, function(err, result) {
          if(err){
            passErr = true
            res.json({
              error: err
            })
          }
          if(result){
            //Current password matches with the one input as current, hence we can change password
            bcrypt.hash(req.body.newpassword, 10, async function(err1, hashedPass){
              if(err1){
                passErr = true
                res.json({
                  error: err1
                })
              }
              user.password = hashedPass
              await user.save()
            })
          }
          else {
            //Input of the current password does not match
            passErr = true
            res.json({
              message: 'Invalid current password! That\'s not your password.'
            })
          }
        })
      }
      else { //Both input passwords are not the same
        passErr = true
        res.json({
          message: 'Passwords do not match.'
        })
      }
    }
    else { //No password confirmation was input
      passErr = true
      res.json({
        message: 'Confirmation password needed!'
      })
    }
  }
  // Save and send updated user
  await user.save()
  if(!passErr){
    res.send(user)
  }
  else {
    res.send()
  }
  
})

/**
 * Delete User
 * This function is pretty straight forward but must be used
 * with utter caution. Deletes an user matching the parameter
 * given, in this case the ID of such user. Returns whether the
 * user was not found or if the user was successfully removed
 * from the Data Base.
 * 
 * The proper way to call this function is by making a request
 * through:
 * host/api/v2/user/delete/:id
 * 
 * Where :id is replaced the actual ID of the user that is
 * going to get the attributes update.
 * Example: host/api/v2/user/5f73377e556c7bf80113cfe4
 */
router.delete('/delete/:id', async (req, res, next) => {
  // The deleteOne() method returns an object containing three fields.
  // n – number of matched documents
  const [err, result] = await to(User.deleteOne({_id: req.params.id}))

  // If an error ocurred 
  if(err) {
    return next(err)
  }

  // If result.n is not zero, the user was not found.
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