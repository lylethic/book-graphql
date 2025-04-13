const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FineSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	transactionId: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['unpaid', 'paid'],
		default: 'unpaid',
	},
	issuedDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('fines', FineSchema);
