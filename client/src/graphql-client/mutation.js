import { gql } from '@apollo/client';

const addSingleBook = gql`
	mutation addSingleBookMutation(
		$name: String
		$genre: String
		$authorId: ID!
	) {
		createBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
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
			genre
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

export {
	addSingleBook,
	addSingleAuthor,
	deleteBook,
	bulkDeleteBook,
	deleteAuthor,
	bulkDeleteAuthor,
};
