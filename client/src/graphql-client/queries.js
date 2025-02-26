import { gql } from '@apollo/client';

const getBooks = gql`
	query getBooksQuery {
		books {
			name
			id
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
				books {
					id
					name
				}
			}
		}
	}
`;

const getAuthors = gql`
	query getAuthorsQuery {
		authors {
			id
			name
		}
	}
`;

const getSingleAuthor = gql`
	query ($id: ID!) {
		author(id: $id) {
			id
			name
			age
			books {
				id
				name
				genre {
					id
					name
					description
				}
			}
		}
	}
`;

const getGenres = gql`
	query getGenresQuery {
		genres {
			id
			name
			description
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

export {
	getBooks,
	getSingleBook,
	getAuthors,
	getSingleAuthor,
	getGenres,
	getSingleGenre,
};
