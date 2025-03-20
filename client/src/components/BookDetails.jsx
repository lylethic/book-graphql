import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleBook } from '../graphql-client/queries';
import { Card } from 'react-bootstrap';
import BookDeleteButton from './BookDeleteButton';
import UpdateBook from './BookUpdate';
import ReviewAddButton from './ReviewAddButton';

const BookDetails = ({ bookId, refetchBooks }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenReview, setIsOpenReview] = useState(false);
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
		<Card text='black' className='shadow'>
			<Card.Body>
				{book === null ? (
					<Card.Text>Please select a book</Card.Text>
				) : (
					<Fragment>
						<Card.Title className='text-capitalize'>
							Title: {book.name}
						</Card.Title>
						<Card.Text className='text-capitalize'>
							Genre: {book.genre.name}
						</Card.Text>
						<Card.Text className='text-capitalize'>
							Author: {book.author.name}
						</Card.Text>
						<Card.Text className='text-capitalize'>
							Age: {book.author.age}
						</Card.Text>

						<BookDeleteButton bookId={bookId} refetchBooks={refetchBooks} />
						<UpdateBook
							isDialogOpen={isOpen}
							setIsDialogOpen={setIsOpen}
							book={book}
							refetchBooks={refetchBooks}
						/>
						{/* <ReviewAddButton
							isDialogOpen={isOpenReview}
							setIsDialogOpen={setIsOpenReview}
							bookId={bookId}
						/> */}
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default BookDetails;
