const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err
      });
    }

    const user = new User({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
      ishost: req.body.ishost,
      commenthistory: req.body.commenthistory,
      hashtags: req.body.hashtags
    });
    user.save()
      .then((user) => {
        res.json({
          message: 'User Added Successfully!'
        });
      })
      .catch((err) => {
        res.json({
          message: 'Failed to add User.'
        });
      });
  });
};

const login = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              error: err
            });
          }
          if (result) {
            const token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '4h' });
            res.json({
              message: 'Login Successful!',
              token,
              user
            });
          } else {
            res.json({
              message: 'Password does not match.'
            });
          }
        });
      } else {
        res.json({
          message: 'No user found.'
        });
      }
    });
};

module.exports = {
  register,
  login
};
