const { gql } = require('apollo-server-express');
const { GraphQLJSON } = require('graphql-type-json');

const typeDefs = gql`
	scalar JSON

	type Book {
		id: ID
		name: String
		genre: String
		author: Author
	}

	type Author {
		id: ID!
		name: String
		age: Int
		books: [Book]
	}

	type DeleteResponse {
		success: Boolean
		message: String
	}

	#ROOT TYPE
	type Query {
		books: [Book]
		book(id: ID!): Book
		authors: [Author]
		author(id: ID!): Author
	}

	type Mutation {
		createAuthor(name: String, age: Int): Author
		createBook(name: String, genre: String, authorId: ID!): Book
		deleteBook(id: ID!): Book
		deleteAuthor(id: ID!): Author
		deleteBooksByCondition(ids: [ID!]!): DeleteResponse
		deleteAuthorsByCondition(ids: [ID!]!): DeleteResponse
	}
`;

module.exports = typeDefs;
