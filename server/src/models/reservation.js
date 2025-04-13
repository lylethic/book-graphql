const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	bookId: {
		type: String,
		required: true,
	},
	reservationDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ['pending', 'completed', 'canceled'],
		default: 'pending',
	},
});

module.exports = mongoose.model('reservations', ReservationSchema);
