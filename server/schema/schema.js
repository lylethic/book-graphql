const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		id: ID!
		name: String
		genre: Genre
		author: Author
	}

	type Author {
		id: ID!
		name: String
		age: Int
		books: [Book]
	}

	type Genre {
		id: ID!
		name: String
		description: String
	}

	type DeleteResponse {
		success: Boolean
		message: String
	}

	input GenreInput {
		name: String!
		description: String
	}

	#ROOT TYPE
	type Query {
		books: [Book]
		book(id: ID!): Book
		authors: [Author]
		author(id: ID!): Author
		genres: [Genre]
		genre(id: ID!): Genre
	}

	type Mutation {
		createAuthor(name: String, age: Int): Author
		deleteAuthor(id: ID!): Author
		updateAuthor(id: ID!, name: String, age: Int): Author
		deleteAuthorsByCondition(ids: [ID!]!): DeleteResponse

		createBook(name: String, genre: ID!, authorId: ID!): Book
		updateBook(id: ID!, name: String, genre: String, authorId: ID): Book
		deleteBook(id: ID!): Book
		deleteBooksByCondition(ids: [ID!]!): DeleteResponse

		createGenre(name: String, description: String): Genre
		createGenres(genres: [GenreInput!]!): [Genre]
		updateGenre(id: ID!, name: String, description: String): Genre
		deleteGenre(id: ID!): Genre
		deleteGenresByCondition(ids: [ID!]!): DeleteResponse
	}
`;

module.exports = typeDefs;
