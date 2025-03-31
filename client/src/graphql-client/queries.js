import { gql } from '@apollo/client';

const getBooks = gql`
	query ($limit: Int, $cursor: ID) {
		books(limit: $limit, cursor: $cursor) {
			nextCursor
			books {
				id
				name
				genre {
					name
				}
				authorId {
					id
					name
					age
				}
				publisherId {
					id
					name
					address
					contact
				}
				image
			}
		}
	}
`;

const searchBook = gql`
	query ($limit: Int, $cursor: ID, $search: String) {
		searchBook(limit: $limit, cursor: $cursor, search: $search) {
			nextCursor
			books {
				id
				name
				genre {
					name
				}
				authorId {
					id
					name
				}
				publisherId {
					id
					name
					address
					contact
				}
				image
			}
		}
	}
`;

const getSingleBook = gql`
	query ($id: ID!) {
		book(id: $id) {
			id
			name
			authorId {
				id
				name
				age
				books {
					id
					name
				}
			}
			genre {
				id
				name
				description
			}
			publisherId {
				id
				name
				address
				contact
			}
			image
		}
	}
`;

const getAuthors = gql`
	query ($limit: Int, $cursor: ID) {
		authors(limit: $limit, cursor: $cursor) {
			authors {
				id
				name
				image
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
			image
			books {
				id
				name
			}
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
				image
			}
			nextCursor
		}
	}
`;

const searchUserByName = gql`
	query ($limit: Int, $cursor: ID, $search: String) {
		searchUserByName(limit: $limit, cursor: $cursor, search: $search) {
			nextCursor
			users {
				id
				name
				email
				role
				image
			}
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
			image
		}
	}
`;

const getAllTransactions = gql`
	query ($status: String, $limit: Int, $cursor: ID) {
		transactions(status: $status, limit: $limit, cursor: $cursor) {
			nextCursor
			transactions {
				id
				userId {
					id
					email
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
				isLateReturn
				fineAmount
				fineStatus
				fineIssuedDate
			}
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
			isLateReturn
			fineAmount
			fineStatus
			fineIssuedDate
		}
	}
`;

const getSingleReservation = gql`
	query ($reservationId: ID!) {
		reservation(id: $reservationId) {
			id
			bookId {
				name
				authorId {
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
					authorId {
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
				id
				bookId {
					id
					name
					authorId {
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
					id
					bookId {
						id
						name
						authorId {
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
	query ($bookId: ID!, $limit: Int, $cursor: ID) {
		getCommentsByBookId(bookId: $bookId, limit: $limit, cursor: $cursor) {
			nextCursor
			comments {
				id
				userId {
					id
					name
					email
				}
				bookId {
					id
					name
				}
				comment
				rating
				reviewDate
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
				authorId {
					name
				}
			}
			rating
			comment
			reviewDate
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
					authorId {
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
				reviewDate
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
	searchBook,
	searchUserByName,
};
