const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

const mongoDataMethods = {
	getAllBooks: async (condition = null) =>
		condition === null ? await Book.find() : await Book.find(condition),

	getBookById: async (id) => await Book.findById(id),

	getAllAuthor: async () => await Author.find(),

	getAuthorById: async (id) => await Author.findById(id),

	getAllGenres: async (condition = null) =>
		condition === null ? await Genre.find() : await Genre.find(condition),

	getGenreById: async (id) => await Genre.findById(id),

	createAuthor: async (args) => {
		const newAuthor = new Author(args);
		return await newAuthor.save();
	},

	createBook: async (args) => {
		const newBook = new Book(args);
		return await newBook.save();
	},

	createGenre: async (args) => {
		const newGenre = new Genre(args);
		return await newGenre.save();
	},

	createGenres: async (genres) => {
		if (Array.isArray(genres)) {
			return await Genre.insertMany(genres);
		} else {
			const newGenre = new Genre(genres);
			return await newGenre.save();
		}
	},

	deleteBook: async (id) => {
		try {
			const deleteBook = await Book.findByIdAndDelete(id);
			if (!deleteBook) throw new Error('Book not found');
			return deleteBook;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete book with id: ${id}');
		}
	},

	deleteAuthor: async (id) => {
		try {
			const deletedAuthor = await Author.findByIdAndDelete(id);
			if (!deletedAuthor) {
				throw new Error('Author not found');
			}
			return deletedAuthor;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete author');
		}
	},

	deleteBooksByCondition: async (ids) => {
		try {
			const result = await Book.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No books found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} books deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete books');
		}
	},

	deleteAuthorsByCondition: async (ids) => {
		try {
			const result = await Author.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No authors found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} authors deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete authors');
		}
	},

	deleteGenre: async (id) => {
		try {
			const deletedGenre = await Genre.findByIdAndDelete(id);
			if (!deletedGenre) {
				throw new Error('genre not found');
			}
			return deletedGenre;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete genre');
		}
	},

	deleteGenresByCondition: async (ids) => {
		try {
			const result = await Genre.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No genres found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} genres deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete genres');
		}
	},

	updateBook: async (id, args) => {
		try {
			const updatedBook = await Book.findByIdAndUpdate(id, args, { new: true });
			if (!updatedBook) throw new Error('Book not found');
			return updatedBook;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update book with id: ${id}`);
		}
	},

	updateAuthor: async (id, args) => {
		try {
			const updatedAuthor = await Author.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!updatedAuthor) throw new Error('Author not found');
			return updatedAuthor;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update author with id: ${id}`);
		}
	},

	updateGenre: async (id, args) => {
		try {
			const updatedGenre = await Genre.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!updatedGenre) throw new Error('Genre not found');
			return updatedGenre;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update genre with id: ${id}`);
		}
	},
};

module.exports = mongoDataMethods;
