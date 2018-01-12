const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../config');
var bcrypt = require('bcrypt');
// const r = require('rethinkdb');

// let connection = null 
// //Connecting to db
// r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
// 	if (err) throw err
// 	connection = conn

// 	console.log('Connected to RethinkDB from auth.js')
// })


//signup rethinkdb
//TODO: need to check if user already exists!!!!
router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request

//pseudo code
  // const user = new User();

  // user.create({}).then(() => {
  //   res.end({})
  // }).catch(() => {

  // }) 


  const { username, name, email, password } = req.body;

  Promise.resolve(password)
  .then(password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
  .then(hash => {
    let user = new User()
    
    user.addNewUser({
      username,
      name,
      email,
      hash
    })
  })
  .then(() => {
      res.json({ success: true });
    })
  .catch(err => next(err))

});

//login rethinkdb

router.post('/login', (req, res, next) => {
  const { username, password } =req.body;
  //check if we have a username and password
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
})

//TODO
// // User.authenticate() returns a function
// const authenticate = User.authenticate();
// router.post('/login', (req, res, next) => {
//   const { username, password } = req.body;
//   // check if we have a username and password
//   if (username && password) {
//     // test if the credentials are valid
//     authenticate(username, password, (err, user, failed) => {
//       if(err) {
//         // an unexpected error from the database
//         return next(err);
//       }
//       if(failed) {
//         // failed logging (bad password, too many attempts, etc)
//         return res.status(401).json({
//           error: failed.message
//         });
//       }
//       if(user) {
//         // success!! Save the user id
//         const payload = { id: user.id };
//         // generate a token and send it
//         const token = jwt.encode(payload, config.jwtSecret);
//         res.json({ token, user });
//       }
//     });
//   } else {
//     // unauthorized error
//     res.sendStatus(401);
//   }
// });

//get user page
router.get('/users/:id', (req, res, next) => {
  r.db('blog_project').table('users').get(req.params.id).run(connection)
  .then(user => {
    res.json(user)
  })
  .catch(err => next(err));
});

module.exports = router;