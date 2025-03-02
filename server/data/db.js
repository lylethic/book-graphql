const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const User = require('../models/user');
const Transaction = require('../models/transaction');

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

	getAllUsers: async ({ limit = 100, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy user có _id lớn hơn cursor
		}

		const users = await User.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = users.length > 0 ? users[users.length - 1]._id : null;

		return {
			users,
			nextCursor,
		};
	},

	getUserById: async (id) => await User.findById(id),

	createUser: async (args) => {
		const existingUser = await User.findOne({ email: args.email });
		if (existingUser) {
			throw new Error('Email already exists');
		}
		const newUser = new User(args);
		return await newUser.save();
	},

	updatedUser: async (id, args) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!updatedUser) throw new Error('User not found');
			return updatedUser;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update User with id: ${id}`);
		}
	},

	deleteUser: async (id) => {
		try {
			const deleteUser = await User.findByIdAndDelete(id);
			if (!deleteUser) throw new Error('User not found');
			return deleteUser;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete User with id: ${id}');
		}
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

	// Transaction
	getAllTransactions: async (condition = null) =>
		condition === null
			? await Transaction.find()
			: await Transaction.find(condition),

	getTransactionById: async (id) => await Transaction.findById(id),

	createTransactions: async (transaction) => {
		if (Array.isArray(transaction)) {
			return await Transaction.insertMany(transaction);
		} else {
			const newTransaction = new Genre(transaction);
			return await newTransaction.save();
		}
	},

	createTransaction: async (args) => {
		const trans = new Transaction(args);
		return await trans.save();
	},

	deleteTransaction: async (id) => {
		try {
			const deleteTrans = await Transaction.findByIdAndDelete(id);
			if (!deleteTrans) throw new Error('Transaction not found');
			return deleteTrans;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Transaction with id: ${id}');
		}
	},

	deleteTransactionByCondition: async (ids) => {
		try {
			const result = await Transaction.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No Transactions found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} Transactions deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Transactions');
		}
	},

	updateTransaction: async (id, args) => {
		try {
			const updatedTransaction = await Transaction.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!updatedTransaction) throw new Error('Transaction not found');
			return updatedTransaction;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update Transaction with id: ${id}`);
		}
	},
};

module.exports = mongoDataMethods;
