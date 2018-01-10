const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../config');

router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request
  const { username, name, email, password } = req.body;

  // create the new user
  const user = new User({
    username,
    email,
  	name
  });

  User.register(user, password, (err) => {
  	if (err) return next(err);

  	res.json({ success: true });
  });
});

// User.authenticate() returns a function
const authenticate = User.authenticate();
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  // check if we have a username and password
  if (username && password) {
    // test if the credentials are valid
    authenticate(username, password, (err, user, failed) => {
      if(err) {
        // an unexpected error from the database
        return next(err);
      }
      if(failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json({
          error: failed.message
        });
      }
      if(user) {
        // success!! Save the user id
        const payload = { id: user.id };
        // generate a token and send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({ token, user });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

//get user page
router.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.json(user)
  })
  .catch(err => next(err));
});

module.exports = router;