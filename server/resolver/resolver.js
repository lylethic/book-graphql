const resolvers = {
	//Query
	Query: {
		books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(args),

		searchBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.searchBookName(args),

		book: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(id),

		authors: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllAuthor(args),

		author: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(id),

		genres: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllGenres(args),

		genre: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getGenreById(id),

		transactions: async (parent, args, { mongoDataMethods }) => {
			const { status, limit, cursor } = args;
			return await mongoDataMethods.getAllTransactions(status, {
				limit,
				cursor,
			});
		},

		transaction: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getTransactionById(id),

		getTransactionIsExistFine: async (parent, args, { mongoDataMethods }) => {
			const { limit, cursor } = args;
			return await mongoDataMethods.getTransactionIsExistFine({
				limit,
				cursor,
			});
		},

		users: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllUsers(args),

		searchUserByName: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.searchUserByName(args),

		user: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(id),

		reservations: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllReservations(args),

		reservation: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getReservation(id),

		getAllReservationsByUserAndBook: async (
			parent,
			{ bookId, status, limit, cursor },
			{ mongoDataMethods }
		) => {
			return await mongoDataMethods.getAllReservationsByUserAndBook(
				bookId,
				status,
				{
					limit,
					cursor,
				}
			);
		},

		// Fine: tien phat
		fines: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllFines(args),

		fine: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getFine(id),

		// publisher: nha xuat ban
		publishers: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllPublishers(args),

		publisher: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getPublisher(id),

		getPublisherById: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getPublisherById(id),

		// review: danh gia
		reviews: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllReviews(args),

		review: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getReview(id),

		// review by book
		getCommentsByBookId: async (
			parent,
			{ bookId, limit, cursor },
			{ mongoDataMethods }
		) => await mongoDataMethods.getCommentsByBookId(bookId, { limit, cursor }),

		getAllFinesByUserId: async (
			parent,
			{ userId, transactionId, limit, cursor },
			{ mongoDataMethods }
		) =>
			await mongoDataMethods.getAllFinesByUserId(userId, transactionId, {
				limit,
				cursor,
			}),
	},

	Book: {
		authorId: async ({ authorId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(authorId),

		genre: async ({ genre }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getGenreById(genre),

		publisherId: async ({ publisherId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getPublisherById(publisherId),
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBooks({ authorId: id }),
	},

	Transaction: {
		userId: async ({ userId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(userId),
		bookId: async ({ bookId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(bookId),
	},

	Reservation: {
		userId: async ({ userId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(userId),
		bookId: async ({ bookId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(bookId),
	},

	Fine: {
		userId: async ({ userId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(userId),
		transactionId: async ({ transactionId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getTransactionById(transactionId),
	},

	Review: {
		bookId: async ({ bookId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(bookId),
		userId: async ({ userId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(userId),
	},

	// MUTATION
	Mutation: {
		createAuthor: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createAuthor(args),

		createAuthors: async (_, args, { mongoDataMethods }) => {
			const { authors } = args;
			return await mongoDataMethods.createAuthors(authors);
		},

		createBook: async (_, args, { mongoDataMethods }) => {
			const { name, genre, authorId, publisherId, image } = args;
			return await mongoDataMethods.createBook(
				name,
				genre,
				authorId,
				publisherId,
				image
			);
		},

		createBooks: async (_, args, { mongoDataMethods }) => {
			const { books } = args;
			return await mongoDataMethods.createBooks(books);
		},

		createGenre: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createGenre(args),
		createGenres: async (parent, args, { mongoDataMethods }) => {
			const { genres } = args;
			return await mongoDataMethods.createGenres(genres);
		},

		createUser: async (parent, args, { mongoDataMethods }) => {
			return await mongoDataMethods.createUser(args);
		},

		createUsers: async (parent, args, { mongoDataMethods }) => {
			const { users } = args;
			return await mongoDataMethods.createUsers(users);
		},

		createTransactions: async (parent, args, { mongoDataMethods }) => {
			const { trans } = args;
			return await mongoDataMethods.createTransactions(trans);
		},

		createTransaction: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createTransaction(args),

		returnBookTransaction: async (_, { transactionId }, { mongoDataMethods }) =>
			await mongoDataMethods.returnBookTransaction(transactionId),

		updateTransaction: async (
			_,
			{
				id,
				userId,
				bookId,
				dueDate,
				borrowDate,
				returnDate,
				status,
				isLateReturn,
				fineAmount,
				fineStatus,
				fineIssuedDate,
			},
			{ mongoDataMethods }
		) =>
			await mongoDataMethods.updateTransaction(id, {
				userId,
				bookId,
				dueDate,
				borrowDate,
				returnDate,
				status,
				isLateReturn,
				fineAmount,
				fineStatus,
				fineIssuedDate,
			}),

		createReservation: async (parent, args, { mongoDataMethods }) => {
			return await mongoDataMethods.createReservation(args);
		},

		createFine: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createFine(args),

		createPublisher: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createPublisher(args),

		createPublishers: async (parent, args, { mongoDataMethods }) => {
			const { publishers } = args;
			return await mongoDataMethods.createPublishers(publishers);
		},

		createReview: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createReview(args),

		createReviews: async (parent, args, { mongoDataMethods }) => {
			const { reviews } = args;
			return await mongoDataMethods.createReviews(reviews);
		},

		deleteBook: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteBook(id),

		deleteAuthor: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteAuthor(id),

		deleteBooksByCondition: async (parent, { ids }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteBooksByCondition(ids),

		deleteAuthorsByCondition: async (parent, { ids }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteAuthorsByCondition(ids),

		deleteGenre: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteGenre(id),

		deleteGenresByCondition: async (parent, { ids }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteGenresByCondition(ids),

		deleteUser: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteUser(id),

		deleteTransaction: async (parent, { id }, { mongoDataMethods }) => {
			const result = await mongoDataMethods.deleteTransaction(id);
			return result;
		},

		deleteTransactionByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods }
		) => await mongoDataMethods.deleteTransactionByCondition(ids),

		deleteReservation: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteReservation(id),

		deleteReservationsByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods }
		) => await mongoDataMethods.deleteReservationsByCondition(ids),

		deleteFine: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteFine(id),

		deleteFinesByCondition: async (parent, { ids }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteFinesByCondition(ids),

		deletePublisher: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deletePublisher(id),

		deletePublishersByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods }
		) => await mongoDataMethods.deletePublishersByCondition(ids),

		deleteReview: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteReview(id),

		deleteReviewsByCondition: async (parent, { ids }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteReviewsByCondition(ids),

		updateBook: async (
			_,
			{ id, name, genre, authorId, publisherId, image },
			{ mongoDataMethods }
		) => {
			return await mongoDataMethods.updateBook(
				id,
				name,
				genre,
				authorId,
				publisherId,
				image
			);
		},

		updateAuthor: async (_, { id, name, age }, { mongoDataMethods }) => {
			return await mongoDataMethods.updateAuthor(id, { name, age });
		},

		updateGenre: async (_, { id, name, description }, { mongoDataMethods }) => {
			return await mongoDataMethods.updateGenre(id, { name, description });
		},

		updateUser: async (
			_,
			{ id, name, email, role, image },
			{ mongoDataMethods }
		) => await mongoDataMethods.updateUser(id, name, email, role, image),

		updateReservation: async (
			_,
			{ id, userId, bookId, reservationDate, status },
			{ mongoDataMethods }
		) =>
			await mongoDataMethods.updateReservation(id, {
				userId,
				bookId,
				reservationDate,
				status,
			}),

		updateFine: async (
			_,
			{ id, userId, transactionId, amount, status },
			{ mongoDataMethods }
		) =>
			await mongoDataMethods.updateFine(id, {
				userId,
				transactionId,
				amount,
				status,
			}),

		updatePublisher: async (
			_,
			{ id, name, address, contact },
			{ mongoDataMethods }
		) => await mongoDataMethods.updatePublisher(id, { name, address, contact }),

		updateReview: async (
			_,
			{ id, bookId, userId, rating, comment },
			{ mongoDataMethods }
		) =>
			await mongoDataMethods.updateReview(id, {
				bookId,
				userId,
				rating,
				comment,
			}),
	},
};

module.exports = resolvers;
