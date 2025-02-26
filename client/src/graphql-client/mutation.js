import { gql } from '@apollo/client';

const addSingleBook = gql`
	mutation ($name: String, $genre: ID!, $authorId: ID!) {
		createBook(genre: $genre, authorId: $authorId, name: $name) {
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
	mutation ($updateGenreId: ID!, $name: String, $description: String) {
		updateGenre(id: $updateGenreId, name: $name, description: $description) {
			id
			name
			description
		}
	}
`;

const deleteGenre = gql`
	mutation ($deleteGenreId: ID!) {
		deleteGenre(id: $deleteGenreId) {
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
	mutation ($id: ID!, $name: String, $genre: String, $authorId: ID) {
		updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			genre {
				id
				name
			}
			author {
				id
				name
				age
			}
		}
	}
`;

const updateAuthor = gql`
	mutation ($updateAuthorId: ID!, $name: String, $age: Int) {
		updateAuthor(id: $updateAuthorId, name: $name, age: $age) {
			id
			name
			age
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
};
