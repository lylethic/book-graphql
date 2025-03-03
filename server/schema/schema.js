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

	type Transaction {
		id: ID!
		userId: User
		bookId: Book
		borrowDate: String!
		dueDate: String!
		returnDate: String
		status: String!
	}

	type DeleteResponse {
		success: Boolean
		message: String
	}

	type User {
		id: ID!
		name: String
		email: String
		password: String
		role: String
	}

	input GenreInput {
		name: String!
		description: String
	}

	input TransactionInput {
		userId: ID!
		bookId: ID!
		dueDate: String!
		borrowDate: String!
		returnDate: String
		status: String!
	}

	type UserPage {
		users: [User!]!
		nextCursor: ID
	}

	type BookPage {
		books: [Book!]!
		nextCursor: ID
	}

	type AuthorPage {
		authors: [Author!]!
		nextCursor: ID
	}

	type GenrePage {
		genres: [Genre!]!
		nextCursor: ID
	}

	type TransactionPage {
		transactions: [Transaction!]!
		nextCursor: ID
	}

	#ROOT TYPE
	type Query {
		books(limit: Int, cursor: ID): BookPage
		book(id: ID!): Book
		authors(limit: Int, cursor: ID): AuthorPage
		author(id: ID!): Author
		genres(limit: Int, cursor: ID): GenrePage
		genre(id: ID!): Genre
		transactions(limit: Int, cursor: ID): TransactionPage
		transaction(id: ID!): Transaction
		users(limit: Int, cursor: ID): UserPage
		user(id: ID!): User
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

		createTransaction(
			userId: ID!
			bookId: ID!
			dueDate: String!
			borrowDate: String!
			returnDate: String
			status: String!
		): Transaction
		createTransactions(trans: [TransactionInput]!): [Transaction]
		returnBookTransaction(transactionId: ID!): Transaction!
		updateTransaction(
			id: ID!
			userId: ID!
			bookId: ID!
			dueDate: String!
		): Transaction
		deleteTransaction(id: ID!): Transaction
		deleteTransactionByCondition(ids: [ID!]!): DeleteResponse

		createUser(
			name: String
			email: String
			password: String
			role: String
		): User
		updateUser(id: ID!, name: String, email: String, role: String): User
		deleteUser(id: ID!): User
	}
`;

module.exports = typeDefs;
