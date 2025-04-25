require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const refreshTokenRouter = require('./routes/refreshTokenRouter.js'); // Refresh token rest api
const { applyMiddleware } = require('graphql-middleware');

// My config permissions
const permissions = require('./middleware/permission.js');

// Verify token from cookie
const verifyTokenFromCookie = require('./middleware/verifyTokenFromCookie.js');

// Load schema and resolver
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// Load DBMethod
const mongoDataMethods = require('./data/db');
const cookieParser = require('cookie-parser');

//Connect to MongoDB
const connectDb = async () => {
	try {
		await mongoose.connect(String(process.env.CONNECTION_MongoDB), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDb connected.');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

const startServer = async () => {
	const schema = applyMiddleware(
		makeExecutableSchema({ typeDefs, resolvers }),
		permissions
	);

	const server = new ApolloServer({
		schema,
		cache: 'bounded',
		context: ({ req, res }) => {
			const user = verifyTokenFromCookie(req);
			return { req, res, mongoDataMethods, user };
		},
	});

	await server.start();

	const app = express();

	app.use(
		cors({
			origin: process.env.PORT_CLIENT || 'http://localhost:3000', // frontend domain
			credentials: true, // allow sending cookies
		})
	);

	app.use(cookieParser());

	app.use('/refresh_token', refreshTokenRouter);

	app.use(express.json({ limit: '25mb' }));
	app.use(express.urlencoded({ limit: '25mb', extended: true }));

	server.applyMiddleware({ app, cors: false });

	app.listen({ port: process.env.PORT }, () => {
		console.log(`Server ready.`);
	});
};

connectDb();

startServer().catch((err) => {
	console.error('Error starting the server:', err);
});
