const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Reservation = require('../models/reservation');
const Review = require('../models/review');
const Fine = require('../models/fine');
const Publisher = require('../models/publisher');
const cloudinary = require('../services/uploadService');
require('dotenv').config();

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;

const mongoDataMethods = {
	createBook: async (name, genre, authorId, publisherId, image) => {
		try {
			let imageUrl; // Temporary variable for Cloudinary URL
			if (image) {
				imageUrl = await cloudinary.uploadImage(image); // Upload base64 string
			}

			const newBook = new Book({
				name,
				genre,
				authorId,
				publisherId,
				image: imageUrl, // Store Cloudinary URL in image field
			});

			return await newBook.save();
		} catch (error) {
			throw new Error(`Error creating book: ${error.message}`);
		}
	},

	getAllBooks: async ({ limit = 50, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy _id lớn hơn cursor
		}

		const books = await Book.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = books.length > 0 ? books[books.length - 1]._id : null;

		return {
			books,
			nextCursor,
		};
	},

	searchBookName: async ({ limit = 50, cursor, search }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy _id lớn hơn cursor
		}
		if (search && search.trim() !== '') {
			filter.name = { $regex: search, $options: 'i' }; // Tìm kiếm theo tên sách, ko phân biệt hoa-thường
		}

		const books = await Book.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = books.length > 0 ? books[books.length - 1]._id : null;

		return {
			books,
			nextCursor,
		};
	},

	getBooks: async (condition = null) =>
		condition === null ? await Book.find() : await Book.find(condition),

	getBookById: async (id) => await Book.findById(id),

	getAllAuthor: async ({ limit = 100, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy _id lớn hơn cursor
		}

		const authors = await Author.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor =
			authors.length > 0 ? authors[authors.length - 1]._id : null;

		return {
			authors: authors,
			nextCursor,
		};
	},

	getAuthors: async (condition = null) =>
		condition === null ? await Author.find() : await Author.find(condition),

	getAuthorById: async (id) => await Author.findById(id),

	getAllGenres: async ({ limit = 50, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
		}

		const genres = await Genre.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = genres.length > 0 ? genres[genres.length - 1]._id : null;

		return {
			genres: genres,
			nextCursor,
		};
	},

	getGenres: async (condition = null) =>
		condition === null ? await Genre.find() : await Genre.find(condition),

	getGenreById: async (id) => await Genre.findById(id),

	createAuthor: async (name, age, image) => {
		try {
			let imageUrl = null;
			if (image) {
				imageUrl = await cloudinary.uploadImage(image);
			}

			const newAuthor = await Author.create({
				name,
				age,
				image: imageUrl,
			});

			return newAuthor;
		} catch (error) {
			throw new Error(`Error creating author: ${error.message}`);
		}
	},

	createAuthors: async (authors) => {
		if (Array.isArray(authors)) {
			return await Author.insertMany(authors);
		} else {
			const newData = new Author(authors);
			return await newData.save();
		}
	},

	createBooks: async (books) => {
		if (Array.isArray(books)) {
			return await Book.insertMany(books);
		} else {
			const newData = new Book(books);
			return await newData.save();
		}
	},

	createGenre: async (args) => {
		const newGenre = new Genre(args);
		return await newGenre.save();
	},

	getAllUsers: async ({ limit = 50, cursor }) => {
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

	searchUserByName: async ({ limit = 50, cursor, search }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy user có _id lớn hơn cursor
		}
		if (search) {
			filter.name = { $regex: search, $options: 'i' }; // Tìm kiếm theo tên user, ko phân biệt hoa-thường
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

	getUsers: async (condition = null) =>
		condition === null ? await User.find() : await User.find(condition),

	getUserById: async (id) => await User.findById(id),

	createUser: async (args) => {
		try {
			let imageUrl;
			if (args.image) {
				imageUrl = await cloudinary.uploadImage(args.image); // Upload base64 string
			}
			const existingUser = await User.findOne({ email: args.email });
			if (existingUser) {
				throw new Error('Email already exists');
			}
			const newUser = new User({ ...args, image: imageUrl });
			return await newUser.save();
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	},

	createUsers: async (args) => {
		const existingUser = await User.findOne({ email: args.email });
		if (existingUser) {
			throw new Error('Email already exists');
		}
		if (Array.isArray(args)) {
			return await User.insertMany(args);
		} else {
			const newUser = new User(args);
			return await newUser.save();
		}
	},

	updateUser: async (id, name, email, role, image) => {
		try {
			let imageUrl = image;

			if (image && !image.startsWith('http')) {
				// Only upload if it's a base64 string
				imageUrl = await cloudinary.uploadImage(image);
			}

			const updateData = {
				name,
				email,
				role,
				...(imageUrl && { image: imageUrl }), // Update image only if provided
			};

			return await User.findByIdAndUpdate(id, updateData, { new: true });
		} catch (error) {
			throw new Error(`Error updating user: ${error.message}`);
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

	updateBook: async (id, name, genre, authorId, publisherId, image) => {
		try {
			let imageUrl;
			if (image && !image.startsWith('http')) {
				// Only upload if it's a base64 string
				imageUrl = await cloudinary.uploadImage(image);
			} else {
				imageUrl = image; // Use existing URL if provided
			}

			const updateData = {
				name,
				genre,
				authorId,
				publisherId: publisherId || undefined,
				...(imageUrl && { image: imageUrl }), // Update image only if provided
			};

			return await Book.findByIdAndUpdate(id, updateData, { new: true });
		} catch (error) {
			throw new Error(`Error updating book: ${error.message}`);
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
	getAllTransactions: async (status, { limit = 50, cursor }) => {
		let filter = {};
		if (status) {
			filter.status = status;
		}
		if (cursor) {
			filter._id = { $lt: cursor }; // Fetch transactions where _id > cursor
		}

		const transactions = await Transaction.find(filter)
			.sort({ _id: -1 }) // newest
			.limit(limit)
			.exec();

		const nextCursor =
			transactions.length > 0
				? transactions[transactions.length - 1]._id
				: null;

		return {
			transactions,
			nextCursor,
		};
	},

	getTransactionById: async (id) => await Transaction.findById(id),

	createTransactions: async (transaction) => {
		if (Array.isArray(transaction)) {
			return await Transaction.insertMany(transaction);
		} else {
			const newTransaction = new Transaction(transaction);
			return await newTransaction.save();
		}
	},

	createTransaction: async (args) => {
		const trans = new Transaction(args);
		return await trans.save();
	},

	returnBookTransaction: async (transactionId) => {
		try {
			const transaction = await Transaction.findById(transactionId);
			if (!transaction) throw new Error('Transaction not found');

			const currentDate = new Date();

			// If the book is already returned, no update needed
			if (transaction.status === 'returned') {
				throw new Error('Book is already returned');
			}

			// Update returnDate and determine if it's overdue
			transaction.returnDate = currentDate;

			const isLate = new Date(transaction.dueDate) < currentDate;
			transaction.status = isLate ? 'overdue' : 'returned';
			transaction.isLateReturn = isLate;

			if (isLate) {
				// Fine calculation logic (example: $1 per day late)
				const msPerDay = 1000 * 60 * 60 * 24;
				const daysLate = Math.ceil(
					(currentDate - new Date(transaction.dueDate)) / msPerDay
				);
				const finePerDay = 1; // Define your fine rate per day
				transaction.fineAmount = daysLate * finePerDay;
				transaction.fineStatus = 'unpaid';
				transaction.fineIssuedDate = currentDate;
			} else {
				transaction.fineAmount = 0;
				transaction.fineStatus = 'none';
				transaction.fineIssuedDate = null;
			}

			await transaction.save();

			// Convert UTC to Vietnam Time (ICT, UTC+7)
			const toVietnamTime = (date) =>
				date
					? new Date(date.getTime() + 7 * 60 * 60 * 1000).toISOString()
					: null;

			const result = transaction.toObject();
			return {
				id: result._id.toString(),
				userId: result.userId,
				bookId: result.bookId,
				borrowDate: toVietnamTime(result.borrowDate),
				dueDate: toVietnamTime(result.dueDate),
				returnDate: toVietnamTime(result.returnDate),
				status: result.status,
				isLateReturn: result.isLateReturn,
				fineAmount: result.fineAmount,
				fineStatus: result.fineStatus,
				fineIssuedDate: toVietnamTime(result.fineIssuedDate),
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteTransaction: async (id) => {
		try {
			const findTransaction = await Transaction.findById(id);
			if (!findTransaction) {
				throw new Error(`Transaction not found with id: ${id}`);
			}

			const deleteTrans = await Transaction.deleteOne({ _id: id });

			if (deleteTrans.deletedCount === 0) {
				throw new Error(`Failed to delete transaction with id: ${id}`);
			}

			return { message: `Transaction with id: ${id} deleted successfully` };
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to delete transaction with id: ${id}`);
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

	// Reservation
	getAllReservations: async ({ limit = 50, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
		}

		const reserv = await Reservation.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = reserv.length > 0 ? reserv[reserv.length - 1]._id : null;

		return {
			reservations: reserv,
			nextCursor,
		};
	},

	getReservation: async (id) => await Reservation.findById(id),

	getAllReservationsByUserAndBook: async (
		bookId,
		status, // Optional
		{ limit = 50, cursor }
	) => {
		let filter = {};

		if (bookId) filter.bookId = bookId;
		if (status) filter.status = status; // Only add status if it's provided

		// Add cursor-based pagination
		if (cursor) {
			filter.reservationDate = { $lt: cursor };
		}

		const reserv = await Reservation.find(filter)
			.sort({ reservationDate: -1 }) // Newest reservationDate first
			.limit(limit)
			.exec();

		const nextCursor =
			reserv.length > 0 ? reserv[reserv.length - 1].reservationDate : null;

		return {
			reservations: reserv,
			nextCursor,
		};
	},

	createReservation: async (args) => {
		const { userId, bookId, status } = args;
		if (!userId || !bookId) {
			throw new Error(
				'Both userId and bookId are required to create a reservation.'
			);
		}
		try {
			const newReservation = new Reservation(args);
			return await newReservation.save();
		} catch (error) {
			throw new Error('Failed to create reservation: ' + error.message);
		}
	},

	updateReservation: async (id, args) => {
		try {
			const update = await Reservation.findByIdAndUpdate(id, args, {
				new: true,
			})
				.populate('bookId')
				.populate('userId');

			if (!update) throw new Error('Reservation not found');
			return update;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update Reservation with id: ${id}`);
		}
	},

	deleteReservation: async (id) => {
		try {
			const deleteReservation = await Reservation.findByIdAndDelete(id);
			if (!deleteReservation) throw new Error('Reservation not found');
			return deleteReservation;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Reservation with id: ${id}');
		}
	},

	deleteReservationsByCondition: async (ids) => {
		try {
			const result = await Reservation.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No Reservations found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} Reservations deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Reservations');
		}
	},

	// fine
	getAllFines: async ({ limit = 50, cursor }) => {
		let filter = {};

		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
		}

		const fine = await Fine.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = fine.length > 0 ? fine[fine.length - 1]._id : null;

		return {
			fines: fine,
			nextCursor,
		};
	},

	getAllFinesByUserId: async (
		userId,
		transactionId,
		{ limit = 50, cursor }
	) => {
		try {
			let filter = {};
			if (userId) filter.userId = userId;
			if (transactionId) filter.transactionId = transactionId;

			if (cursor) {
				filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
			}

			const fine = await Fine.find(filter)
				.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
				.limit(limit)
				.exec();

			const nextCursor = fine.length > 0 ? fine[fine.length - 1]._id : null;

			return {
				fines: fine,
				nextCursor,
			};
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to fetch fines for userId: ${userId}`);
		}
	},

	getTransactionIsExistFine: async ({ limit = 10, cursor }) => {
		try {
			const aggregationPipeline = [
				{
					$match: {
						status: 'overdue',
						returnDate: { $ne: null },
					},
				},
				{
					$addFields: {
						id: '$_id',
						isLate: { $gt: ['$returnDate', '$dueDate'] },
					},
				},
				{
					$match: {
						isLate: true,
					},
				},
				{
					$lookup: {
						from: 'fines', // collection name in MongoDB
						localField: '_id',
						foreignField: 'transactionId',
						as: 'fine',
					},
				},
				{
					$addFields: {
						hasFine: { $gt: [{ $size: '$fine' }, 0] },
					},
				},
				{
					$project: {
						_id: 0,
						id: 1,
						userId: 1,
						bookId: 1,
						borrowDate: 1,
						dueDate: 1,
						returnDate: 1,
						status: 1,
						hasFine: 1,
					},
				},
				{ $sort: { _id: 1 } },
				...(cursor
					? [{ $match: { _id: { $gt: mongoose.Types.ObjectId(cursor) } } }]
					: []),
				{ $limit: limit },
			];

			const transactions = await Transaction.aggregate(aggregationPipeline);

			return {
				transactions: transactions || [], // Fallback to empty array
				nextCursor:
					transactions.length > 0
						? transactions[transactions.length - 1]._id
						: null,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to get transactions with fine existence.');
		}
	},

	getFine: async (id) => await Fine.findById(id),

	createFine: async (args) => {
		try {
			const { userId, transactionId, amount, status } = args;

			// Fetch transaction to validate overdue and calculate fine if needed
			const transaction = await Transaction.findById(transactionId);
			if (!transaction) {
				throw new Error('Transaction not found');
			}

			// Ensure book is returned
			if (!transaction.returnDate) {
				throw new Error('Book has not been returned yet.');
			}

			// Check if fine already exists for this transaction
			const existingFine = await Fine.findOne({ transactionId });
			if (existingFine) {
				throw new Error('Fine already exists for this transaction.');
			}

			// Calculate fine if not provided
			let fineAmount = amount;
			if (!fineAmount) {
				if (transaction.returnDate > transaction.dueDate) {
					const msPerDay = 24 * 60 * 60 * 1000;
					const overdueDays = Math.ceil(
						(transaction.returnDate - transaction.dueDate) / msPerDay
					);
					const finePerDay = 1;
					fineAmount = overdueDays * finePerDay;
				} else {
					// Returned on time, no fine needed
					throw new Error('Book returned on time. No fine needed.');
				}
			}

			const newFine = new Fine({
				userId,
				transactionId,
				amount: fineAmount,
				status: status || 'unpaid',
			});

			const savedFine = await newFine.save();
			return savedFine;
		} catch (err) {
			throw new Error(err.message);
		}
	},

	updateFine: async (id, args) => {
		try {
			const update = await Fine.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!update) throw new Error('Fine not found');
			return update;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update Fine with id: ${id}`);
		}
	},

	deleteFine: async (id) => {
		try {
			const deleteFine = await Fine.findByIdAndDelete(id);
			if (!deleteFine) throw new Error('Fine not found');
			return deleteFine;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Fine with id: ${id}');
		}
	},

	deleteFinesByCondition: async (ids) => {
		try {
			const result = await Fine.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No Fines found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} Fine deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Fines');
		}
	},

	// Publisher
	getAllPublishers: async ({ limit = 50, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
		}

		const publisher = await Publisher.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor =
			publisher.length > 0 ? publisher[publisher.length - 1]._id : null;

		return {
			publishers: publisher,
			nextCursor,
		};
	},

	getPublisher: async (id) => {
		try {
			if (!id) {
				return { data: null, message: 'Publisher ID is required' };
			}

			const publisher = await Publisher.findById(id);
			if (!publisher) {
				return { data: null, message: `Publisher with ID ${id} not found` };
			}

			return { data: publisher, message: null };
		} catch (error) {
			console.error(error);
			return {
				data: null,
				message: `Error fetching publisher: ${error.message}`,
			};
		}
	},

	getPublisherById: async (id) => await Publisher.findById(id),

	createPublisher: async (args) => {
		const newPublisher = new Publisher(args);
		return await newPublisher.save();
	},

	createPublishers: async (publishers) => {
		try {
			if (Array.isArray(publishers))
				return await Publisher.insertMany(publishers);
			else {
				const data = Publisher(publishers);
				return await data.save();
			}
		} catch (error) {
			console.error('Error creating publishers:', error);
			throw new Error(`Failed to create publishers: ${error.message}`);
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

	updatePublisher: async (id, args) => {
		try {
			const update = await Publisher.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!update) throw new Error('Publisher not found');
			return update;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update Publisher with id: ${id}`);
		}
	},

	deletePublisher: async (id) => {
		try {
			const deletePublisher = await Publisher.findByIdAndDelete(id);
			if (!deletePublisher) throw new Error('Publisher not found');
			return deletePublisher;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Publisher with id: ${id}');
		}
	},

	deletePublishersByCondition: async (ids) => {
		try {
			const result = await Publisher.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No Publishers found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} Publisher deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Publishers');
		}
	},

	// Review
	getAllReviews: async ({ limit = 50, cursor }) => {
		let filter = {};
		if (cursor) {
			filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
		}

		const review = await Review.find(filter)
			.sort({ _id: 1 }) // Sắp xếp tăng dần theo _id
			.limit(limit)
			.exec();

		const nextCursor = review.length > 0 ? review[review.length - 1]._id : null;

		return {
			reviews: review,
			nextCursor,
		};
	},

	getReview: async (id) => await Review.findById(id),

	getCommentsByBookId: async (bookId, { limit = 50, cursor }) => {
		try {
			let filter = { bookId };
			if (cursor) {
				filter = { _id: { $gt: cursor } }; // Lấy có _id lớn hơn cursor
			}
			const comments = await Review.find(filter)
				.sort({ _id: 1 })
				.limit(limit)
				.exec();

			const nextCursor =
				comments.length > 0 ? comments[comments.length - 1]._id : null;

			return { comments: comments, nextCursor };
		} catch (error) {
			console.error(error);
		}
	},

	createReview: async (args) => {
		const newReview = new Review(args);
		return await newReview.save();
	},

	createReviews: async (reviews) => {
		if (Array.isArray(reviews)) {
			return await Review.insertMany(reviews);
		} else {
			const newReview = new Review(reviews);
			return await newReview.save();
		}
	},

	updateReview: async (id, args) => {
		try {
			const update = await Review.findByIdAndUpdate(id, args, {
				new: true,
			});
			if (!update) throw new Error('Review not found');
			return update;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update Review with id: ${id}`);
		}
	},

	deleteReview: async (id) => {
		try {
			const deleteReview = await Review.findByIdAndDelete(id);
			if (!deleteReview) throw new Error('Review not found');
			return deleteReview;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Review with id: ${id}');
		}
	},

	deleteReviewsByCondition: async (ids) => {
		try {
			const result = await Review.deleteMany({ _id: { $in: ids } });
			if (result.deletedCount === 0) {
				throw new Error('No Reviews found matching the condition');
			}
			return {
				success: true,
				message: `${result.deletedCount} Reviews deleted successfully`,
			};
		} catch (error) {
			console.error(error);
			throw new Error('Failed to delete Reviews');
		}
	},
};

module.exports = mongoDataMethods;
