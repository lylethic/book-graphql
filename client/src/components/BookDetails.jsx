import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleBook } from '../graphql-client/queries';
import { Card } from 'react-bootstrap';
import BookDeleteButton from './BookDeleteButton';

const BookDetails = ({ bookId, refetchBooks }) => {
	const { loading, error, data } = useQuery(getSingleBook, {
		variables: {
			id: bookId,
		},
		skip: bookId === null,
	});

	if (loading) return <p>Loading book details...</p>;
	if (error) {
		console.log(error.message);
		return <p>Error Loading book details!</p>;
	}

	const book = bookId !== null ? data.book : null;

	return (
		<Card bg='info' text='white' className='shadow'>
			<Card.Body>
				{book === null ? (
					<Card.Text>Please select a book</Card.Text>
				) : (
					<Fragment>
						<Card.Title>Literary work: {book.name}</Card.Title>

						<Card.Text>Genre: {book.genre}</Card.Text>
						<Card.Text>Author: {book.author.name}</Card.Text>
						<Card.Text>Age: {book.author.age}</Card.Text>
						<Card.Text>All Books By this author:</Card.Text>
						<ul>
							{book.author.books.map((book) => (
								<li key={book.id}>{book.name}</li>
							))}
						</ul>
						<BookDeleteButton bookId={bookId} refetchBooks={refetchBooks} />
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default BookDetails;
