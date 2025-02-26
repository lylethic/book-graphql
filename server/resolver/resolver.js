const mongoDataMethods = require('../data/db');

const resolvers = {
	//Query
	Query: {
		books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(),

		book: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(id),

		authors: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllAuthor(),

		author: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(id),

		genres: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllGenres(),

		genre: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getGenreById(),
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
	},
};

module.exports = resolvers;
