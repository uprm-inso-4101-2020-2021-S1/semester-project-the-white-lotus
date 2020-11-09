const express = require("express");
const router = express.Router();
const to = require('../utils').to;

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
/**
 * @swagger
 * /user/all:
 *  get:
 *      summary: Use to get all users
 *      description: Retrieve all the users stored in the database
 *      tags:
 *        - user
 *      responses:
 *        '200':
 *          description: A successful response
 *        '500':
 *          description: An internal server error occurred
 */
router.get('/all', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

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
/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Use to get an individual user
 *    description: Uses the id variable at the end of the path to identify and retreieve a specific place
 *    tags:
 *      - user
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
 *        description: User was not found
 *      '500':
 *        description: An internal server error ocurred
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
/**
 * @swagger
 * /user/register:
 *  post:
 *    summary: Use to register an user
 *    description: Uses a JSON with required fields to register a new "user" on the database
 *    tags:
 *      - user
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: An internal server error occurred
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
/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: Use to login
 *    description: Uses a JSON with required fields to login an existing user
 *    tags:
 *      - user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the place to get
 *    requestBody:
 *      description:  <p>Requires email and password to login.</p>
 *      requred:  true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "hector.miranda8@upr.edu"
 *              password:
 *                type: string
 *                example: "testing1234"
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '500':
 *        description: An internal server error ocurred
 */
router.post('/login', AuthController.login)

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
/**
 * @swagger
 * /user/update/{id}:
 *  patch:
 *    summary:  Use to update information of an user
 *    description:  Uses the id variable to identify the user to which modify the information and a JSON body with the update information
 *    tags:
 *      - user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the user to update
 *    requestBody:
 *      description: <p>Example below</p>
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *                example:  "Somewhere else in Puerto Rico"
 *              hashtags:
 *                type: array
 *                items:
 *                  type: string
 *                  example: "#Wild"
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User was not found
 *      '500':
 *        description: An internal server error ocurred
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
      date: String(new Date()),
      comment: req.body.comment.comment
    })
  }
  if(req.body.hashtags){
    if(!user.hashtags.includes(req.body.hashtags)){
      user.hashtags.push(req.body.hashtags)
    }
  }

  //TODO: Update password

  // Save and send updated user
  await user.save()
  res.send(user)
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
/**
 * @swagger
 * /user/delete/{id}:
 *  delete:
 *    summary: Use to delete an user by id
 *    description: Deletes a specific user by id, removing the user from the database
 *    tags:
 *      - user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        //required: true
 *        description: Unique id of the user to delete
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User was not found
 *      '500':
 *        description: An internal server error ocurred
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