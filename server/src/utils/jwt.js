import jwt from 'jsonwebtoken';
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

export const signToken = (data) => {
	return jwt.sign(data, SECRET_KEY);
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECRET_KEY);
};
