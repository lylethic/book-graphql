const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('genres', GenreSchema);
