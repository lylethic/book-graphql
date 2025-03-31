const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	name: {
		type: String,
	},
	age: {
		type: Number,
	},
	image: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model('authors', AuthorSchema);
