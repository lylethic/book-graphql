import { gql } from '@apollo/client';

const getBooks = gql`
	query ($limit: Int, $cursor: ID) {
		books(limit: $limit, cursor: $cursor) {
			books {
				id
				name
				genre {
					name
				}
			}
			nextCursor
		}
	}
`;

const getSingleBook = gql`
	query getSingleBookQuery($id: ID!) {
		book(id: $id) {
			id
			name
			genre {
				id
				name
				description
			}
			author {
				id
				name
				age
			}
		}
	}
`;

const getAuthors = gql`
	query ($limit: Int, $cursor: ID) {
		authors(limit: $limit, cursor: $cursor) {
			authors {
				id
				name
			}
			nextCursor
		}
	}
`;

const getSingleAuthor = gql`
	query ($id: ID!) {
		author(id: $id) {
			id
			name
			age
		}
	}
`;

const getGenres = gql`
	query ($limit: Int, $cursor: ID) {
		genres(limit: $limit, cursor: $cursor) {
			genres {
				id
				name
				description
			}
			nextCursor
		}
	}
`;

const getSingleGenre = gql`
	query ($id: ID!) {
		genre(id: $id) {
			id
			name
			description
		}
	}
`;

const getUsers = gql`
	query ($limit: Int, $cursor: ID) {
		users(limit: $limit, cursor: $cursor) {
			users {
				id
				name
				email
				role
			}
			nextCursor
		}
	}
`;

const getSingleUser = gql`
	query ($id: ID!) {
		user(id: $id) {
			id
			name
			email
			role
		}
	}
`;

const getAllTransactions = gql`
	query ($limit: Int, $cursor: ID) {
		transactions(limit: $limit, cursor: $cursor) {
			transactions {
				id
				userId {
					id
					email
				}
				bookId {
					id
					name
				}
				borrowDate
				dueDate
				status
			}
			nextCursor
		}
	}
`;

const getSingleTransaction = gql`
	query ($transactionId: ID!) {
		transaction(id: $transactionId) {
			id
			userId {
				id
				name
			}
			bookId {
				id
				name
			}
			borrowDate
			dueDate
			returnDate
			status
		}
	}
`;

export {
	getBooks,
	getSingleBook,
	getAuthors,
	getSingleAuthor,
	getGenres,
	getSingleGenre,
	getUsers,
	getSingleUser,
	getAllTransactions,
	getSingleTransaction,
};
