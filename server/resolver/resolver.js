const resolvers = {
	//Query
	Query: {
		books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(args),

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

		transactions: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllTransactions(args),

		transaction: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getTransactionById(id),

		users: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllUsers(args),

		user: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(id),
	},

	Book: {
		author: async ({ authorId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(authorId),

		genre: async ({ genre }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getGenreById(genre),
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks({ authorId: id }),
	},

	Transaction: {
		userId: async ({ userId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getUserById(userId),
		bookId: async ({ bookId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(bookId),
	},

	// MUTATION
	Mutation: {
		createAuthor: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createAuthor(args),

		createBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createBook(args),

		createGenre: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createGenre(args),

		createGenres: async (parent, args, { mongoDataMethods }) => {
			const { genres } = args;
			return await mongoDataMethods.createGenres(genres);
		},

		createUser: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createUser(args),

		createTransactions: async (parent, args, { mongoDataMethods }) => {
			const { trans } = args;
			return await mongoDataMethods.createTransactions(trans);
		},

		createTransaction: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createTransaction(args),

		returnBookTransaction: async (_, { transactionId }, { mongoDataMethods }) =>
			await mongoDataMethods.returnBookTransaction(transactionId),

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
			await mongoDataMethods.deleteTransaction(ids),

		deleteTransaction: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteGenre(id),

		deleteTransactionByCondition: async (
			parent,
			{ ids },
			{ mongoDataMethods }
		) => await mongoDataMethods.deleteTransactionByCondition(ids),

		updateBook: async (
			_,
			{ id, name, genre, authorId },
			{ mongoDataMethods }
		) => {
			return await mongoDataMethods.updateBook(id, { name, genre, authorId });
		},

		updateAuthor: async (_, { id, name, age }, { mongoDataMethods }) => {
			return await mongoDataMethods.updateAuthor(id, { name, age });
		},

		updateGenre: async (_, { id, name, description }, { mongoDataMethods }) => {
			return await mongoDataMethods.updateGenre(id, { name, description });
		},

		updateUser: async (_, { id, name, email, role }, { mongoDataMethods }) =>
			await mongoDataMethods.updateUser(id, { name, email, role }),

		deleteUser: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.deleteUser(id),
	},
};

module.exports = resolvers;
