const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	contact: {
		type: String,
	},
});

module.exports = mongoose.model('publishers', PublisherSchema);
