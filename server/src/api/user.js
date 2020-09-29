const express = require("express");
const router = express.Router();

// User registration authorization
const AuthController = require('../../controllers/AuthController')

router.get('/', (req, res) => {
  res.json({
    msg: 'In user!!!'
  });
});

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router