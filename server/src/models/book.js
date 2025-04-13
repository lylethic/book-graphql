const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	name: {
		type: String,
	},
	image: {
		type: String,
		default: null,
	},
	genre: {
		type: String,
	},
	authorId: {
		type: String,
	},
	publisherId: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model('books', BookSchema);
