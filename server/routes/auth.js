const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../config');
var bcrypt = require('bcrypt');


//signup rethinkdb
//TODO: need to check if user already exists!!!!
router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request
  const { username, name, email, password } = req.body;

  Promise.resolve(password)
  .then(password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
  .then(hash => {
    let user = new User()
    
    user.addNewUser({
      username,
      name,
      email,
      password: hash
    })
  })
  .then(() => {
      res.json({ success: true });
    })
  .catch(err => next(err))

});

//login rethinkdb
//const authenticate = User.authenticate();
router.post('/login', (req, res, next) => {
  const { username, password } =req.body;

  let model = new User()
  //check if we have a username and password
  if (username && password) {
    
    let user 
    model.findUser({username})
      .then(cursor => cursor.toArray((err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(result, null, 2))
    })).then((data) => {
        user = data[0]
        if (user && model.authenticate(user, password)) {
          // success!! Save the user id
          const payload = { id: user.id };
          //console.log('in auth routes payload ',payload)
          // generate a token and send it
          const token = jwt.encode(payload, config.jwtSecret);
          res.json({ token, user });
        } else {
          // unauthorized error
          res.sendStatus(401);
        }
    })
    .catch(err => next(err))
    
  }
})

//get user page
router.get('/users/:id', (req, res, next) => {
  let model = new User()

  model.findById(req.params.id)
  .then(user => {
    res.json(user)
  })
  .catch(err => next(err));
});

module.exports = router;