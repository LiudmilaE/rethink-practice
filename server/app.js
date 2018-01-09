const express = require('express');
const history = require('express-history-api-fallback');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('./config'); //JWT secret
const mongoose = require('mongoose');
const dbName = 'blog';
mongoose.connect(`mongodb://localhost/${dbName}`, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

passport.initialize();

const strategy = new Strategy({
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
(payload, done) => {
  User.findById(payload.id)
  .then(user => {
    if(user) {
      done(null, user);
    } else {
      done(new Error('User not found'))
    }
  });
});

passport.use(strategy);


const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.use('/api/users', users);

// protecting the route
app.get(
	"/api/secret",
	// this is protecting the route and giving us access to req.user
	passport.authenticate('jwt', config.jwtSession),
	(req,res) => {
	// send the user his own information
	res.json(req.user);
	}
);

app.use('/', express.static(path.join(__dirname, '../client/dist')))
app.use(history('index.html', { root: path.join(__dirname, '../client/dist') }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
