"use strict";
const r = require('rethinkdb');
const bcrypt = require('bcrypt');

let connection = null 
//Connecting to db
r.connect({ host: 'localhost', port: 28015, db: "blog_project" }, (err, conn) => {
	if (err) throw err
	connection = conn

	console.log('Connected to RethinkDB from user model')
})

//user model goes here //TODO show the message about error "This username already exists"
class User {
    addNewUser(userData, password, cb) {
			if(userData && userData.username) {
				r.table('users').filter({ username: userData.username}).run(connection)
				.then(cursor => cursor.toArray((err, result) => {
						if (err) throw err;
					//	console.log(JSON.stringify(result, null, 2))
						if (result.length===0) {
							r.table('users').insert(userData).run(connection)
						} else {
							return { message : "This username already exists " }
						}
				})).catch(err => {
					if (err) throw err
				})
				
			}
		} 

		authenticate (user, password) {
			return bcrypt.compareSync(password, user.password)
		}

    findById(id) {
			if(id) {
				return r.table('users').get(id).run(connection)
				.then(data => {
					//console.log('findById in model ',data)
				})
			} 
    }

    findUser(userData) {
				//r.table('users').filter(data).run(connection)
				if(userData && userData.username) {
					return r.table('users').filter({ username: userData.username}).run(connection)
				}
    }
}


module.exports = User;

//for mongo and mongoose

// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
// 	// the username and password are added by passportLocalMongoose
// 	name: String,
// 	email: String,
// });

// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', userSchema);