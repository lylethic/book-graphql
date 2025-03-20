const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		id: ID!
		name: String
		genre: Genre
		author: Author
		publisher: Publisher
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

	type User {
		id: ID!
		name: String
		email: String
		password: String
		role: String
	}

	input UserInput {
		name: String
		email: String
		password: String
		role: String
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

	type Reservation {
		id: ID!
		userId: User
		bookId: Book
		reservationDate: String
		status: String
	}

	type Fine {
		id: ID!
		userId: User
		transactionId: Transaction
		amount: Float
		status: String
		issuedDate: String
	}

	type Publisher {
		id: ID!
		name: String
		address: String
		contact: String
	}

	type Review {
		id: ID!
		bookId: Book
		userId: User
		rating: Int
		comment: String
	}

	type DeleteResponse {
		success: Boolean
		message: String
	}

	type PublisherResponse {
		data: Publisher
		message: String
	}

	input GenreInput {
		name: String!
		description: String
	}

	input PublisherInput {
		name: String
		address: String
		contact: String
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

	type FinePage {
		fines: [Fine!]!
		nextCursor: ID
	}

	type ReviewPage {
		reviews: [Review!]!
		nextCursor: ID
	}

	type PublisherPage {
		publishers: [Publisher!]!
		nextCursor: ID
	}

	type PaginatedComments {
		comments: [Review]
		nextCursor: ID
	}

	type ReservationPage {
		reservations: [Reservation!]!
		nextCursor: ID
	}

	type DeleteResponseMessage {
		message: String!
	}

	#ROOT TYPE
	type Query {
		books(limit: Int, cursor: ID): BookPage
		book(id: ID!): Book

		authors(limit: Int, cursor: ID): AuthorPage
		author(id: ID!): Author

		genres(limit: Int, cursor: ID): GenrePage
		genre(id: ID!): Genre

		users(limit: Int, cursor: ID): UserPage
		user(id: ID!): User

		transactions(status: String, limit: Int, cursor: ID): TransactionPage
		transaction(id: ID!): Transaction

		reservations(limit: Int, cursor: ID): ReservationPage
		reservation(id: ID!): Reservation

		fine(id: ID!): Fine
		fines(limit: Int, cursor: ID): FinePage

		review(id: ID!): Review
		reviews(limit: Int, cursor: ID): ReviewPage

		publisher(id: ID!): PublisherResponse
		publishers(limit: Int, cursor: ID): PublisherPage

		getCommentsByBookId(bookId: ID!, limit: Int, cursor: ID): PaginatedComments

		getAllFinesByUserId(
			userId: ID
			transactionId: ID
			limit: Int
			cursor: ID
		): FinePage

		getAllReservationsByUserAndBook(
			bookId: ID!
			status: String
			limit: Int
			cursor: ID
		): ReservationPage
	}

	type Mutation {
		createAuthor(name: String, age: Int): Author
		deleteAuthor(id: ID!): Author
		updateAuthor(id: ID!, name: String, age: Int): Author
		deleteAuthorsByCondition(ids: [ID!]!): DeleteResponse

		createBook(name: String, genre: ID!, authorId: ID!, publisherId: ID): Book
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
			dueDate: String
			borrowDate: String
			returnDate: String
			status: String
		): Transaction

		deleteTransaction(id: ID!): DeleteResponseMessage
		deleteTransactionByCondition(ids: [ID!]!): DeleteResponse

		createUser(
			name: String
			email: String
			password: String
			role: String
		): User
		createUsers(users: [UserInput!]!): [User]
		updateUser(id: ID!, name: String, email: String, role: String): User
		deleteUser(id: ID!): User

		createReservation(userId: ID!, bookId: ID!, status: String): Reservation

		updateReservation(
			id: ID!
			userId: ID
			bookId: ID
			reservationDate: String
			status: String
		): Reservation

		deleteReservation(id: ID!): Reservation
		deleteReservationsByCondition(ids: [ID!]!): DeleteResponse

		createFine(
			userId: ID!
			transactionId: ID!
			amount: Float
			status: String
		): Fine

		updateFine(
			id: ID!
			userId: ID
			transactionId: ID
			amount: Float
			status: String
		): Fine

		deleteFine(id: ID!): Fine
		deleteFinesByCondition(ids: [ID!]!): DeleteResponse

		createPublisher(name: String, address: String, contact: String): Publisher

		createPublishers(publishers: [PublisherInput!]!): [Publisher]

		updatePublisher(
			id: ID!
			name: String
			address: String
			contact: String
		): Publisher

		deletePublisher(id: ID!): Publisher
		deletePublishersByCondition(ids: [ID!]!): DeleteResponse

		createReview(userId: ID, bookId: ID, rating: Int, comment: String): Review

		updateReview(
			id: ID!
			userId: ID
			bookId: ID
			rating: Int
			comment: String
		): Review

		deleteReview(id: ID!): Review
		deleteReviewsByCondition(ids: [ID!]!): DeleteResponse
	}
`;

module.exports = typeDefs;
