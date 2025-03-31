import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleBook } from '../graphql-client/queries';
import {
	Card,
	Col,
	Row,
	Button,
	Image,
	ListGroup,
	Container,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import BookDeleteButton from './BookDeleteButton';
import UpdateBook from './BookUpdate';
import ReviewAddButton from './ReviewAddButton';
import ReviewsByBook from './reviews-by-book';
import { toast } from 'react-toastify';

const BookDetails = ({ refetchBooks }) => {
	const { id: bookId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenReview, setIsOpenReview] = useState(false); // For ReviewAddButton dialog

	const { loading, error, data } = useQuery(getSingleBook, {
		variables: bookId ? { id: bookId } : {},
		skip: !bookId, // Skip query if bookId is missing
	});

	if (loading) {
		toast.info('Loading book details...');
		return <p className='text-center'>Loading book details...</p>;
	}
	if (error) {
		toast.error('Error loading book details...');
		console.error('Error loading book details:', error.message);

		return (
			<p className='text-center text-danger'>Error loading book details!</p>
		);
	}

	const book = data?.book || null;

	if (!book) return <p className='text-center'>No book found!</p>;

	return (
		<Container>
			<Row className='my-4'>
				<Col md={4} sm={12}>
					{/* Book Image */}
					{book.image ? (
						<Image
							src={book.image}
							alt={book.name}
							fluid
							rounded
							className='mb-3 shadow'
							style={{ maxHeight: '400px', objectFit: 'cover' }}
						/>
					) : (
						<div
							className='bg-light d-flex align-items-center justify-content-center mb-3 shadow'
							style={{ height: '400px', borderRadius: '8px' }}
						>
							<span className='text-muted'>No image available</span>
						</div>
					)}
				</Col>
				<Col md={8} sm={12}>
					<Card className='shadow-sm'>
						<Card.Body>
							<Card.Title
								className='text-capitalize mb-3'
								style={{ fontSize: '1.5rem' }}
							>
								{book.name}
							</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								Genre: {book.genre?.name || 'N/A'}
							</Card.Subtitle>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<strong>Author:</strong> {book.authorId?.name || 'Unknown'}
									{book.authorId?.age && (
										<span className='ms-2'> (Age: {book.authorId.age})</span>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Publisher:</strong> {book.publisherId?.name || 'N/A'}
									{book.publisherId?.address && (
										<span className='ms-2'> ({book.publisherId.address})</span>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Contact:</strong> {book.publisherId?.contact || 'N/A'}
								</ListGroup.Item>
							</ListGroup>

							{/* Author’s Other Books */}
							{book.authorId?.books?.length > 0 && (
								<Fragment>
									<h5 className='mt-3'>Other Books by {book.authorId.name}</h5>
									<ListGroup variant='flush'>
										{book.authorId.books.map((otherBook) => (
											<ListGroup.Item
												key={otherBook.id}
												className='text-capitalize'
											>
												<Link
													to={`/books/${otherBook.id}`}
													className='text-decoration-none'
												>
													{otherBook.name}
												</Link>
											</ListGroup.Item>
										))}
									</ListGroup>
								</Fragment>
							)}

							{/* Action Buttons */}
							<div className='mt-4 d-flex gap-2'>
								<UpdateBook
									isDialogOpen={isOpen}
									setIsDialogOpen={setIsOpen}
									book={book}
									refetchBooks={refetchBooks}
								/>
								{/* <BookDeleteButton bookId={bookId} refetchBooks={refetchBooks} />
							<ReviewAddButton
								isDialogOpen={isOpenReview}
								setIsDialogOpen={setIsOpenReview}
								bookId={bookId}
							/> */}
							</div>

							{/* Reviews this book */}
						</Card.Body>
					</Card>
				</Col>
				<ReviewsByBook bookId={bookId} />
			</Row>
		</Container>
	);
};

export default BookDetails;
