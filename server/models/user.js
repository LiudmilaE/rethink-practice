const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	// the username and password are added by passportLocalMongoose
	name: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);