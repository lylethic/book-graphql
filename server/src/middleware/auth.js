// Create Middleware to Read Token from Cookie
/**
 * S_1.Read the JWT from cookies
 * S_2. Verify the token
 * S_3. Add user info to context in Apollo Server
 */
require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const accessToken = process.env.JWT_ACCESS_PRIVATE_KEY;

module.exports = function cookieAuthMiddleware(req, res, next) {
	// Get token from cookie
	const token = req.cookies.accessToken;

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Unauthorized: No token in cookies' });
	}

	try {
		const decoded = jwt.verify(token, secretKey);
		req.user = decoded;

		// Optional: attach token as if it's in header
		req.headers.authorization = `Bearer ${token}`;

		next();
	} catch (err) {
		return res.status(403).json({ message: 'Forbidden: Invalid token' });
	}
};
