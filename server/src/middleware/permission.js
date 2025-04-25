const { rule, shield, and, or, not } = require('graphql-shield');

// Define public and private queries and mutations
const privateQueriesForAdmin = ['searchUserByName', 'users', 'user', 'fines'];
const privateMutationsForAdmin = [
	'createBook',
	'createBooks',
	'createGenre',
	'createGenres',
	'createAuthor',
	'createAuthors',
	'createUser',
	'createUsers',
	'createTransaction',
	'createTransactions',
	'returnBookTransaction',
	'createFine',
	'createPublisher',
	'createPublishers',
	'deleteBook',
	'deleteAuthor',
	'deletePublisher',
	'deletePublishersByCondition',
	'deleteFine',
	'deleteBooksByCondition',
	'deleteAuthorsByCondition',
	'deleteGenre',
	'deleteGenresByCondition',
	'deleteUser',
	'deleteFinesByCondition',
	'updateBook',
	'updateTransaction',
	'updateAuthor',
	'updateGenre',
	'updateFine',
	'updatePublisher',
];

const privateQueriesIsAuth = [
	'books',
	'reservation',
	'reservations',
	'getAllReservationsByUserAndBook',
	'transactions',
	'transaction',
	'getTransactionIsExistFine',
	'fine',
	'getAllFinesByUserId',
	'book',
	'genre',
	'authors',
	'author',
	'searchBook',
	'publishers',
	'publisher',
	'getPublisherById',
	'reviews',
	'review',
	'getCommentsByBookId',
];

const mapMethodsByCondition = (methods, condition) =>
	methods.reduce((acc, method) => {
		acc[method] = condition;
		return acc;
	}, {});

// Define roles
const ADMIN = 'admin';
const USER = 'user';

// Create allow-all rule
const allowAll = rule({ cache: 'contextual' })(() => true);

// Define rules
const isAuthenticated = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		// Check if user is authenticated
		return ctx.user !== null;
	}
);
const isAdmin = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		// Check if user has admin role
		return ctx.user.role === ADMIN;
	}
);
const isUser = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		// Check if user has user role
		return ctx.user.role === USER;
	}
);

// Define permissions
const permissions = shield({
	Query: {
		// Require authentication for all queries
		// '*': isAuthenticated,
		...mapMethodsByCondition(privateQueriesForAdmin, isAdmin),
		...mapMethodsByCondition(privateQueriesIsAuth, isAuthenticated),
	},

	Mutation: {
		// Require authentication for all mutations
		// '*': isAuthenticated,
		// Allow public resources
		...mapMethodsByCondition(privateMutationsForAdmin, isAdmin),
	},
});
// Export permissions middleware
module.exports = permissions;
