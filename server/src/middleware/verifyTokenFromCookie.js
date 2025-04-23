// middlewares/verifyTokenFromCookie.js
require('dotenv').config();

const jwt = require('jsonwebtoken');
const accessTokenCookieName = process.env.ACCESS_TOKEN_COOKIE_NAME;
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_PRIVATE_KEY;

const verifyTokenFromCookie = (req) => {
	const token = req.cookies[accessTokenCookieName];

	if (!token) return null;

	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
		return decoded;
	} catch (err) {
		console.error('Token verification failed:', err.message);
		return null;
	}
};

module.exports = verifyTokenFromCookie;
