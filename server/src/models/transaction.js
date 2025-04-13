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
	isLateReturn: {
		type: Boolean,
		default: false, // Automatically set to true if returnDate > dueDate
	},
	fineAmount: {
		type: Number,
		default: 0, // Fine amount charged for this transaction
	},
	fineStatus: {
		type: String,
		enum: ['unpaid', 'paid', 'none'],
		default: 'none', // 'none' if no fine needed, 'unpaid' if late but not paid
	},
	fineIssuedDate: {
		type: Date,
		default: null,
	}, // Date when fine was issued (optional, useful for history)
});

module.exports = mongoose.model('transactions', TransactionSchema);
