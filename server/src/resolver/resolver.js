const resolvers = {
	//Query
	Query: {
		books: async (parent, args, { mongoDataMethods }) => {
			return await mongoDataMethods.getAllBooks(args);
		},

		searchBook: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.searchBookName(args),

		book: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getBookById(id),

		authors: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAllAuthor(args),

		author: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAuthorById(id),

		genres: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAllGenres(args),

		genre: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getGenreById(id),

		transactions: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { status, limit, cursor } = args;
			return await mongoDataMethods.getAllTransactions(status, {
				limit,
				cursor,
			});
		},

		transaction: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getTransactionById(id);
		},

		getTransactionIsExistFine: async (
			parent,
			args,
			{ mongoDataMethods, user }
		) => {
			const { limit, cursor } = args;
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getTransactionIsExistFine({
				limit,
				cursor,
			});
		},

		users: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getAllUsers(args);
		},

		searchUserByName: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.searchUserByName(args);
		},

		user: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getUserById(id);
		},

		reservations: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getAllReservations(args);
		},

		reservation: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getReservation(id);
		},

		getAllReservationsByUserAndBook: async (
			parent,
			{ bookId, status, limit, cursor },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
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
		fines: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getAllFines(args);
		},

		fine: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getFine(id);
		},

		// publisher: nha xuat ban
		publishers: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAllPublishers(args),

		publisher: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getPublisher(id),

		getPublisherById: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getPublisherById(id),

		// review: danh gia
		reviews: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAllReviews(args),

		review: async (parent, { id }, { mongoDataMethods, user }) =>
			await mongoDataMethods.getReview(id),

		// review by book
		getCommentsByBookId: async (
			parent,
			{ bookId, limit, cursor },
			{ mongoDataMethods, user }
		) => await mongoDataMethods.getCommentsByBookId(bookId, { limit, cursor }),

		getAllFinesByUserId: async (
			parent,
			{ userId, transactionId, limit, cursor },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.getAllFinesByUserId(userId, transactionId, {
				limit,
				cursor,
			});
		},
	},

	Book: {
		authorId: async ({ authorId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getAuthorById(authorId),

		genre: async ({ genre }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getGenreById(genre),

		publisherId: async ({ publisherId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getPublisherById(publisherId),
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getBooks({ authorId: id }),
	},

	Transaction: {
		userId: async ({ userId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getUserById(userId),
		bookId: async ({ bookId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getBookById(bookId),
	},

	Reservation: {
		userId: async ({ userId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getUserById(userId),
		bookId: async ({ bookId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getBookById(bookId),
	},

	Fine: {
		userId: async ({ userId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getUserById(userId),
		transactionId: async (
			{ transactionId },
			args,
			{ mongoDataMethods, user }
		) => await mongoDataMethods.getTransactionById(transactionId),
	},

	Review: {
		bookId: async ({ bookId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getBookById(bookId),
		userId: async ({ userId }, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.getUserById(userId),
	},

	// MUTATION
	Mutation: {
		createAuthor: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { name, age, image } = args;
			return await mongoDataMethods.createAuthor(name, age, image);
		},

		createAuthors: async (_, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { authors } = args;
			return await mongoDataMethods.createAuthors(authors);
		},

		createBook: async (_, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { name, genre, authorId, publisherId, image } = args;
			return await mongoDataMethods.createBook(
				name,
				genre,
				authorId,
				publisherId,
				image
			);
		},

		createBooks: async (_, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { books } = args;
			return await mongoDataMethods.createBooks(books);
		},

		createGenre: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.createGenre(args);
		},
		createGenres: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { genres } = args;
			return await mongoDataMethods.createGenres(genres);
		},

		createUser: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}

			return await mongoDataMethods.createUser(args);
		},

		createUsers: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { users } = args;
			return await mongoDataMethods.createUsers(users);
		},

		loginUser: async (parent, args, { res, mongoDataMethods }) => {
			return await mongoDataMethods.loginUser(args, res);
		},

		createTransactions: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { trans } = args;
			return await mongoDataMethods.createTransactions(trans);
		},

		createTransaction: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.createTransaction(args);
		},

		returnBookTransaction: async (
			_,
			{ transactionId },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.returnBookTransaction(transactionId);
		},

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
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateTransaction(id, {
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
			});
		},

		createReservation: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.createReservation(args);
		},

		createFine: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.createFine(args);
		},

		createPublisher: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.createPublisher(args);
		},

		createPublishers: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { publishers } = args;
			return await mongoDataMethods.createPublishers(publishers);
		},

		createReview: async (parent, args, { mongoDataMethods, user }) =>
			await mongoDataMethods.createReview(args),

		createReviews: async (parent, args, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const { reviews } = args;
			return await mongoDataMethods.createReviews(reviews);
		},

		deleteBook: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteBook(id);
		},

		deleteAuthor: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteAuthor(id);
		},

		deleteBooksByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteBooksByCondition(ids);
		},

		deleteAuthorsByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteAuthorsByCondition(ids);
		},

		deleteGenre: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteGenre(id);
		},

		deleteGenresByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteGenresByCondition(ids);
		},

		deleteUser: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteUser(id);
		},

		deleteTransaction: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			const result = await mongoDataMethods.deleteTransaction(id);
			return result;
		},

		deleteTransactionByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteTransactionByCondition(ids);
		},

		deleteReservation: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteReservation(id);
		},

		deleteReservationsByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteReservationsByCondition(ids);
		},

		deleteFine: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteFine(id);
		},

		deleteFinesByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteFinesByCondition(ids);
		},

		deletePublisher: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deletePublisher(id);
		},

		deletePublishersByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deletePublishersByCondition(ids);
		},

		deleteReview: async (parent, { id }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteReview(id);
		},

		deleteReviewsByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.deleteReviewsByCondition(ids);
		},

		updateBook: async (
			_,
			{ id, name, genre, authorId, publisherId, image },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateBook(
				id,
				name,
				genre,
				authorId,
				publisherId,
				image
			);
		},

		updateAuthor: async (_, { id, name, age }, { mongoDataMethods, user }) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateAuthor(id, { name, age });
		},

		updateGenre: async (
			_,
			{ id, name, description },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateGenre(id, { name, description });
		},

		updateUser: async (
			_,
			{ id, name, email, role, image },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateUser(id, name, email, role, image);
		},

		updateReservation: async (
			_,
			{ id, userId, bookId, reservationDate, status },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateReservation(id, {
				userId,
				bookId,
				reservationDate,
				status,
			});
		},

		updateFine: async (
			_,
			{ id, userId, transactionId, amount, status },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateFine(id, {
				userId,
				transactionId,
				amount,
				status,
			});
		},

		updatePublisher: async (
			_,
			{ id, name, address, contact },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updatePublisher(id, {
				name,
				address,
				contact,
			});
		},

		updateReview: async (
			_,
			{ id, bookId, userId, rating, comment },
			{ mongoDataMethods, user }
		) => {
			if (!user) {
				throw new Error('Unauthorized access!');
			}
			return await mongoDataMethods.updateReview(id, {
				bookId,
				userId,
				rating,
				comment,
			});
		},
	},
};

module.exports = resolvers;
