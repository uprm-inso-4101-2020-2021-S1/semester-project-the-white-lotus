const express = require("express");
const router = express.Router();

// API Routing
const user = require('./api/user');
const posts = require('./api/posts');



router.get('/', (req, res) => {
  res.json({
    msg: 'In routes.js!!'
  });
});

router.use('/user', user);
router.use('/posts', posts);

module.exports = router