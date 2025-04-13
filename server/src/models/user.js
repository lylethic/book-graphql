const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	role: {
		type: String, // "admin" | "customer"
		enum: ['user', 'admin'],
	},
	image: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model('users', UserSchema);
