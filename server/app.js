const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Load schema and resolver
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// Load DBMethod
const mongoDataMethods = require('./data/db');

//Connect to MongoDB
const connectDb = async () => {
	try {
		await mongoose.connect(String(process.env.CONNECTION_MongoDB), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDb connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDb();

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ mongoDataMethods }),
	});

	await server.start();

	const app = express();
	app.use(cors());
	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
	});
};

startServer().catch((err) => {
	console.error('Error starting the server:', err);
});
