const express = require("express");
const router = express.Router();

// API Routing
const users = require('./api/users');
const posts = require('./api/posts');

router.get('/', (req, res) => {
  res.json({
    msg: 'In routes.js!!'
  });
});

router.use('/users', users);
router.use('/posts', posts);

module.exports = router