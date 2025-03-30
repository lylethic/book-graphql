import { gql } from '@apollo/client';

const addSingleBook = gql`
	mutation (
		$name: String
		$genre: ID!
		$authorId: ID!
		$publisherId: ID
		$image: String
	) {
		createBook(
			genre: $genre
			authorId: $authorId
			name: $name
			publisherId: $publisherId
			image: $image
		) {
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
			publisherId {
				id
				name
			}
			image
		}
	}
`;

const addSingleAuthor = gql`
	mutation addSingleAuthorMutation($name: String, $age: Int) {
		createAuthor(name: $name, age: $age) {
			id
			name
			age
		}
	}
`;

const deleteBook = gql`
	mutation deleteSingleBookMutation($id: ID!) {
		deleteBook(id: $id) {
			id
			name
		}
	}
`;

const bulkDeleteBook = gql`
	mutation deleteMultipleBooksMutation($ids: [ID!]!) {
		deleteBooksByCondition(ids: $ids) {
			id
			name
			age
		}
	}
`;

const deleteAuthor = gql`
	mutation deleteSingleAuthor($id: ID!) {
		deleteAuthor(id: $id) {
			id
			name
			age
		}
	}
`;

const bulkDeleteAuthor = gql`
	mutation deleteSingleAuthor($ids: [ID!]!) {
		deleteAuthorsByCondition(ids: $ids) {
			success
			message
		}
	}
`;

const addGenre = gql`
	mutation ($name: String, $desciption: String) {
		createGenre(name: $name, description: $desciption) {
			id
			name
			description
		}
	}
`;

const addGenres = gql`
	mutation ($genres: [GenreInput!]!) {
		createGenres(genres: $genres) {
			id
			name
			description
		}
	}
`;

const updateGenre = gql`
	mutation ($id: ID!, $name: String, $description: String) {
		updateGenre(id: $id, name: $name, description: $description) {
			id
			name
			description
		}
	}
`;

const deleteGenre = gql`
	mutation ($id: ID!) {
		deleteGenre(id: $id) {
			id
			name
			description
		}
	}
`;

const deleteGenres = gql`
	mutation ($ids: [ID!]!) {
		deleteGenresByCondition(ids: $ids) {
			message
			success
		}
	}
`;

const updateBook = gql`
	mutation (
		$id: ID!
		$name: String
		$genre: String
		$authorId: String
		$publisherId: String
		$image: String
	) {
		updateBook(
			id: $id
			name: $name
			genre: $genre
			authorId: $authorId
			publisherId: $publisherId
			image: $image
		) {
			id
			name
			genre {
				id
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
				contact
				address
			}
			image
		}
	}
`;

const updateAuthor = gql`
	mutation ($id: ID!, $name: String, $age: Int) {
		updateAuthor(id: $id, name: $name, age: $age) {
			id
			name
			age
		}
	}
`;

const createUser = gql`
	mutation (
		$name: String
		$email: String
		$password: String
		$role: String
		$image: String
	) {
		createUser(
			name: $name
			email: $email
			password: $password
			role: $role
			image: $image
		) {
			id
			name
			email
			role
			image
		}
	}
`;

const deleteUser = gql`
	mutation ($id: ID!) {
		deleteUser(id: $id) {
			id
			email
			name
			role
			image
		}
	}
`;

const updateUser = gql`
	mutation ($id: ID!, $email: String, $name: String, $role: String) {
		updateUser(id: $id, name: $name, email: $email, role: $role) {
			id
			name
			email
			role
			image
		}
	}
`;

const createTransaction = gql`
	mutation (
		$userId: String!
		$bookId: String!
		$dueDate: String!
		$borrowDate: String!
		$returnDate: String
		$status: String!
		$isLateReturn: Boolean
		$fineAmount: Float
		$fineStatus: String
		$fineIssuedDate: String
	) {
		createTransaction(
			userId: $userId
			bookId: $bookId
			borrowDate: $borrowDate
			dueDate: $dueDate
			returnDate: $returnDate
			status: $status
			isLateReturn: $isLateReturn
			fineAmount: $fineAmount
			fineStatus: $fineStatus
			fineIssuedDate: $fineIssuedDate
		) {
			id
			userId {
				id
				name
			}
			bookId {
				id
				name
			}
			dueDate
			borrowDate
			returnDate
			status
			isLateReturn
			fineAmount
			fineStatus
			fineIssuedDate
		}
	}
`;

const updateTransaction = gql`
	mutation (
		$id: ID!
		$userId: String!
		$bookId: String!
		$dueDate: String
		$borrowDate: String
		$status: String
		$returnDate: String
		$isLateReturn: Boolean
		$fineAmount: Float
		$fineStatus: String
		$fineIssuedDate: String
	) {
		updateTransaction(
			id: $id
			userId: $userId
			bookId: $bookId
			dueDate: $dueDate
			borrowDate: $borrowDate
			returnDate: $returnDate
			status: $status
			isLateReturn: $isLateReturn
			fineAmount: $fineAmount
			fineStatus: $fineStatus
			fineIssuedDate: $fineIssuedDate
		) {
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

const returnBookTransation = gql`
	mutation ($transactionId: ID!) {
		returnBookTransaction(transactionId: $transactionId) {
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
	}
`;

const deleteTransaction = gql`
	mutation ($id: ID!) {
		deleteTransaction(id: $id) {
			message
		}
	}
`;

const addSinleReservation = gql`
	mutation ($bookId: ID!, $userId: ID!, $status: String) {
		createReservation(bookId: $bookId, userId: $userId, status: $status) {
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
			reservationDate
			status
		}
	}
`;

const updateReservation = gql`
	mutation (
		$updateReservationId: ID!
		$bookId: ID
		$userId: ID
		$reservationDate: String
		$status: String
	) {
		updateReservation(
			id: $updateReservationId
			bookId: $bookId
			userId: $userId
			reservationDate: $reservationDate
			status: $status
		) {
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

const deleteSinleReservation = gql`
	mutation ($deleteReservationId: ID!) {
		deleteReservation(id: $deleteReservationId) {
			id
			userId {
				name
			}
			bookId {
				name
				authorId {
					name
				}
				genre {
					name
				}
			}
			reservationDate
			status
		}
	}
`;

const deleteReservationsByCondition = gql`
	mutation ($ids: [ID!]!) {
		deleteReservationsByCondition(ids: $ids) {
			success
			message
		}
	}
`;

const addSingleFine = gql`
	mutation (
		$userId: ID!
		$amount: Float
		$transactionId: ID!
		$status: String
	) {
		createFine(
			userId: $userId
			amount: $amount
			transactionId: $transactionId
			status: $status
		) {
			id
			userId {
				id
				name
			}
			amount
			issuedDate
			status
		}
	}
`;

const updateFine = gql`
	mutation (
		$fineId: ID!
		$amount: Float
		$transactionId: ID
		$userId: ID
		$status: String
	) {
		updateFine(
			id: $fineId
			amount: $amount
			transactionId: $transactionId
			userId: $userId
			status: $status
		) {
			id
			userId {
				id
				name
			}
			transactionId {
				bookId {
					id
					name
				}
				borrowDate
				dueDate
				returnDate
				status
			}
			amount
			status
		}
	}
`;

const deleteSingleFine = gql`
	mutation ($fineId: ID!) {
		deleteFine(id: $fineId) {
			id
			userId {
				id
				name
			}
			transactionId {
				bookId {
					id
					name
				}
				borrowDate
				dueDate
				returnDate
				status
			}
			amount
			status
		}
	}
`;

const deleteFinesByCondition = gql`
	mutation ($ids: [ID!]!) {
		deleteFinesByCondition(ids: $ids) {
			message
			success
		}
	}
`;

const createPublisher = gql`
	mutation ($publishers: [PublisherInput!]!) {
		createPublishers(publishers: $publishers) {
			id
			name
			address
			contact
		}
	}
`;

const updatePublisher = gql`
	mutation (
		$updatePublisherId: ID!
		$name: String
		$address: String
		$contact: String
	) {
		updatePublisher(
			id: $updatePublisherId
			name: $name
			address: $address
			contact: $contact
		) {
			id
			name
			address
			contact
		}
	}
`;

const deleteSinglePublisher = gql`
	mutation ($deletePublisherId: ID!) {
		deletePublisher(id: $deletePublisherId) {
			id
			name
			address
			contact
		}
	}
`;

const deletePublishersByCondition = gql`
	mutation ($ids: [ID!]!) {
		deletePublishersByCondition(ids: $ids) {
			message
			success
		}
	}
`;

const addSingleReview = gql`
	mutation ($userId: ID, $bookId: ID, $rating: Int, $comment: String) {
		createReview(
			bookId: $bookId
			userId: $userId
			rating: $rating
			comment: $comment
		) {
			id
			bookId {
				name
			}
			userId {
				name
			}
			rating
			comment
		}
	}
`;

const updateReview = gql`
	mutation (
		$id: ID!
		$bookId: ID
		$userId: ID
		$comment: String
		$rating: Int
	) {
		updateReview(
			id: $id
			bookId: $bookId
			userId: $userId
			comment: $comment
			rating: $rating
		) {
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
			}
			userId {
				id
				name
			}
			rating
			comment
		}
	}
`;

const deleteSingleReview = gql`
	mutation ($ids: [ID!]!) {
		deleteReviewsByCondition(ids: $ids) {
			message
			success
		}
	}
`;

export {
	addSingleBook,
	addSingleAuthor,
	addGenre,
	addGenres,
	deleteBook,
	bulkDeleteBook,
	deleteAuthor,
	bulkDeleteAuthor,
	deleteGenre,
	deleteGenres,
	updateBook,
	updateAuthor,
	updateGenre,
	createUser,
	deleteUser,
	createTransaction,
	updateTransaction,
	returnBookTransation,
	deleteTransaction,
	updateUser,
	addSinleReservation,
	updateReservation,
	deleteReservationsByCondition,
	addSingleFine,
	updateFine,
	deleteSingleFine,
	deleteFinesByCondition,
	createPublisher,
	updatePublisher,
	deleteSinglePublisher,
	deletePublishersByCondition,
	addSingleReview,
	updateReview,
	deleteSingleReview,
};
