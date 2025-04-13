import { Schema } from 'mongoose';
import { create } from './book';

const MessageSchema = new Schema({
	text: String,
	createdAt: String,
	createdBy: String,
});

module.exports = model('messages', MessageSchema);
