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

const getSingleReservation = gql`
	query ($reservationId: ID!) {
		reservation(id: $reservationId) {
			id
			bookId {
				name
				author {
					name
				}
			}
			userId {
				name
			}
			status
			reservationDate
		}
	}
`;

const getAllReservations = gql`
	query ($limit: Int, $cursor: ID) {
		reservations(limit: $limit, cursor: $cursor) {
			nextCursor
			reservations {
				id
				bookId {
					id
					name
					author {
						name
					}
				}
				userId {
					id
					name
				}
				status
				reservationDate
			}
		}
	}
`;

const getAllReservationsByUserAndBook = gql`
	query ($bookId: ID!, $status: String, $limit: Int, $cursor: ID) {
		getAllReservationsByUserAndBook(
			bookId: $bookId
			status: $status
			limit: $limit
			cursor: $cursor
		) {
			nextCursor
			reservations {
				id
				userId {
					id
					name
				}
				bookId {
					id
					name
					publisher {
						name
					}
				}
				reservationDate
				status
			}
		}
	}
`;

const getFine = gql`
	query ($fineId: ID!) {
		fine(id: $fineId) {
			id
			amount
			issuedDate
			status
			userId {
				id
				name
			}
			transactionId {
				bookId {
					id
					name
					author {
						id
						name
					}
					genre {
						id
						name
					}
				}
			}
		}
	}
`;

const getAllFines = gql`
	query ($limit: Int, $cursor: ID) {
		fines(limit: $limit, cursor: $cursor) {
			nextCursor
			fines {
				id
				amount
				issuedDate
				status
				userId {
					id
					name
				}
				transactionId {
					bookId {
						id
						name
						author {
							id
							name
						}
						genre {
							id
							name
						}
					}
				}
			}
		}
	}
`;

// Review book
const getCommentsByBookId = gql`
	query ($bookId: ID!, $limit: Int) {
		getCommentsByBookId(bookId: $bookId, limit: $limit) {
			nextCursor
			comments {
				id
				bookId {
					id
					name
				}
				userId {
					id
					name
				}
				comment
			}
		}
	}
`;

const getAllFinesByUserId = gql`
	query ($userId: ID!, $transactionId: ID, $limit: Int, $cursor: ID) {
		getAllFinesByUserId(
			userId: $userId
			transactionId: $transactionId
			limit: $limit
			cursor: $cursor
		) {
			nextCursor
			fines {
				id
				userId {
					id
					name
				}
				amount
				issuedDate
				transactionId {
					id
					borrowDate
					dueDate
					returnDate
					bookId {
						id
						name
					}
				}
			}
		}
	}
`;

const getSinglePublisher = gql`
	query ($publisherId: ID!) {
		publisher(id: $publisherId) {
			data {
				id
				name
				address
				contact
			}
			message
		}
	}
`;

const getAllPublishers = gql`
	query ($limit: Int, $cursor: ID) {
		publishers(limit: $limit, cursor: $cursor) {
			nextCursor
			publishers {
				id
				name
				address
				contact
			}
		}
	}
`;

const getSingleReview = gql`
	query ($reviewId: ID!) {
		review(id: $reviewId) {
			id
			userId {
				id
				name
			}
			bookId {
				id
				name
				genre {
					name
				}
				author {
					name
				}
			}
			rating
			comment
		}
	}
`;

const getAllReviewsByBook = gql`
	query ($bookId: ID!, $limit: Int) {
		getCommentsByBookId(bookId: $bookId, limit: $limit) {
			nextCursor
			comments {
				id
				bookId {
					id
					name
					genre {
						name
					}
					author {
						name
					}
					publisher {
						name
					}
				}
				userId {
					id
					name
				}
				comment
			}
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
	getSingleReservation,
	getAllReservations,
	getAllReservationsByUserAndBook,
	getCommentsByBookId,
	getAllFinesByUserId,
	getFine,
	getAllFines,
	getSinglePublisher,
	getAllPublishers,
	getSingleReview,
	getAllReviewsByBook,
};
