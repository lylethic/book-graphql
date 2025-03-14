const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	bookId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
	},
	comment: {
		type: String,
	},
	reviewDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('reviews', ReviewSchema);
