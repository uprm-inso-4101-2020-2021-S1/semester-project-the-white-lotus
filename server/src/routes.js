const express = require("express");
const router = express.Router();

// API Routing
const place = require('./api/place');
const posts = require('./api/posts');
const user = require('./api/user');



router.get('/', (req, res) => {
  res.json({
    msg: 'In routes.js!!'
  });
});

router.use('/place', place);
router.use('/posts', posts);
router.use('/user', user);

module.exports = router