const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config');
// const dbName = 'blog';
// mongoose.connect(`mongodb://localhost/${dbName}`, { useMongoClient: true });
// const db = mongoose.connection;

//signup - create account
router.post('/signup', (req, res, next) => {
  const {
    username, email, password,
  } = req.body;

  const user = new User({
    username,
    email,
  });

	//added hashed passport 
  User.register(user, password, err => {
    if (err) {
      return next(err)
    }
    res.json({ success: true });
  });
});

//login
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
				// Save the user id
				const payload = { id: user.id };
				// generate a token and send it
				const token = jwt.encode(payload, config.jwtSecret);
				res.json({
					user: {
						username: user.username,
            _id: user._id,
            email: user.email,
					},
					token,
				});
			}
		});
	} else {
		// unauthorized error
		res.sendStatus(401);
	}
});

/* GET users listing. */


//get user page
router.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.json(user)
  })
  .catch(err => next(err));
});

module.exports = router;
