const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const config = require('./config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const cors = require('cors');
const app = express();

//creates our apps http server - because of express generator we should fix bin/www!!!
const server = require('http').Server(app);
const io = require('socket.io')(server);

//TODO need to fix bug - never goes here
io.on('connection', function(socket){
  console.log("socket connected in express")
  socket.on('articleAdd', function(data){
		console.log(data);
    io.emit('articleAdd', data);
	});
	socket.on('disconnect', function(){
		console.log('disconneted')
	})
});



const r = require('rethinkdb');
let connection = null 
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
	if (err) throw err
	connection = conn
	
	//check if db exists
	r.dbList().contains('blog_project')
	.do(function(databaseExists) {
		return r.branch(
			databaseExists,
			{ dbs_created: 0 },
			r.dbCreate('blog_project')
		);
	}).run(connection).then(()=>{
		//Does the table exist?
	r.table('articles').limit(1).run(connection, function(error, cursor){
		var promise;
		if (error) {
			console.log('Creating table...');
			promise = r.tableCreate('articles').run(connection);
		} else {
			promise = cursor.toArray();
		}

		//The table exists, setup the update listener
		promise.then(function(result) {

			console.log("Setting up update listener...")
				//TODO start  the changefeed 
				//.filter(r.row('old_val').eq(null)) - filter new inserted
			r.table('articles').changes().run(connection).then(function(cursor) {
				cursor.each(function(err, item) {
					if (item && item.new_val) {  //only when a new article is added
						console.log(item.new_val)
						io.sockets.emit("articleAdd", item.new_val);
					}		
				});
			})
		})
	})
	})
	
	console.log('Connected to RethinkDB')
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //to use postman

if (app.get('env') === 'development') {
	app.use(
		cors({
			origin: 'http://localhost:8081',
		})
	);
}

passport.initialize();
// Create the strategy for JWT
const strategy = new Strategy({
		// this is a config we pass to the strategy
		// it needs to secret to decrypt the payload of the
		// token.
		secretOrKey: config.jwtSecret,
	// This options tells the strategy to extract the token
	// from the header of the request
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	(payload, done) => {
		// payload is the object we encrypted at the route /api/token
		// We get the user id, make sure the user exist by looking it up
		
		//for RethinkDB
		let model = new User()
		model.findById(payload.id)
			.then((user) => {
			if (user) {
				// make the user accessible in req.user
				user
				//console.log("from app.js ", user)
				done(null, user);
			} else {
				done(new Error("User not found"));
			}
		})
	}
);

//tell passport to use it
passport.use(strategy);

//passing our socket to our response in middleware.
app.use(function(req, res, next){
  res.io = io;
  next();
});

const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const commentsRoutes = require('./routes/comments');

app.use('/api', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/comments', commentsRoutes);


app.get(
	"/api/secret",
	// this is protecting the route and giving us access to req.user
	passport.authenticate('jwt', config.jwtSession),
	(req,res) => {
	// send the user his own information
	res.json(req.user);
	}
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	// return the error message only in development mode
	res.json({
	message: err.message,
	error: req.app.get('env') === 'development' ? err.message : {}
	});
});

//export our server there as well since we're declaring it on line #14 instead of bin/www.
module.exports = {app: app, server: server};