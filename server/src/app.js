const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const refreshTokenRouter = require('./routes/refreshTokenRouter.js');

require('dotenv').config();

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
		console.log('MongoDb connected!!!!');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => ({ req, res, mongoDataMethods }),
	});

	await server.start();

	const app = express();

	app.use(
		cors({
			origin: 'http://localhost:3000', // frontend domain
			credentials: true, // allow sending cookies
		})
	);

	app.use(cookieParser());

	app.use('/refresh_token', refreshTokenRouter);

	app.use(express.json({ limit: '25mb' }));
	app.use(express.urlencoded({ limit: '25mb', extended: true }));

	server.applyMiddleware({ app, cors: false });

	app.listen({ port: 4000 }, () => {
		console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
	});
};

connectDb();

startServer().catch((err) => {
	console.error('Error starting the server:', err);
});
