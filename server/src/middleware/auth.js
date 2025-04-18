const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
	//context = {...header}
	const authHeader = context.req.headers.authorization || '';
	if (authHeader) {
		// Bearer ...
		const token = authHeader.split(' ')[1];
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY);
				return user;
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired token');
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]'");
	}
	throw new Error('Authentication header must be provided');
};
