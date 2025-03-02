const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	userId: {
		type: String,
	},
	bookId: {
		type: String,
	},
	borrowDate: {
		type: Date,
	},
	dueDate: {
		type: Date,
	},
	returnDate: {
		type: Date,
		default: null,
	},
	status: {
		type: String,
		enum: ['borrowed', 'returned', 'overdue'],
		required: true,
	},
});

module.exports = mongoose.model('transactions', TransactionSchema);
