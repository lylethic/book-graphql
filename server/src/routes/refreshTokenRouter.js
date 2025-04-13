const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const JWT_ACCESS_PRIVATE_KEY = process.env.JWT_ACCESS_PRIVATE_KEY;
const JWT_REFRESH_PRIVATE_KEY = process.env.JWT_REFRESH_PRIVATE_KEY;

router.get('/', (req, res) => {
	const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME]; // <-- match cookie name

	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token missing' });
	}

	try {
		const decoded = jwt.verify(refreshToken, JWT_REFRESH_PRIVATE_KEY);

		const newAccessToken = jwt.sign(
			{ user_id: decoded.user_id, email: decoded.email },
			JWT_ACCESS_PRIVATE_KEY,
			{ expiresIn: '15m' }
		);

		res.cookie('jwt_access_token', newAccessToken, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000,
			sameSite: 'Lax',
			secure: false,
		});

		return res.json({ message: 'Access token refreshed successfully' });
	} catch (err) {
		console.error(err);
		return res.status(403).json({ message: 'Invalid refresh token' });
	}
});

module.exports = router;
