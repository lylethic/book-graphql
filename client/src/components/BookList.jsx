import React, { useState } from 'react';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import BookAddButton from './BookAddButton';

const BookList = ({ setSelectedBookId }) => {
	const [bookSelected, setBookSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getBooks, {
		variables: { limit: 5, cursor: null },
	});

	if (loading) return <p>Loading books...</p>;
	if (error) return <p>Error Loading books...</p>;

	// Function to load more books
	const loadMoreBooks = () => {
		fetchMore({
			variables: { cursor: data.books.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					books: {
						books: [...prevResult.books.books, ...fetchMoreResult.books.books], // Append new books
						nextCursor: fetchMoreResult.books.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handleBookDeleted = (deletedBookId) => {
		if (bookSelected === deletedBookId) {
			setBookSelected(null);
		}
		refetch();
	};

	return (
		<Row>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='my-2 text-capitalize'>books</h4>
				<BookAddButton />
			</div>
			<Col xs={12} md={6} className='mb-lg-0 mb-3'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.books.books.map((book) => (
						<Button
							variant='outline-primary'
							key={book.id}
							border='info'
							text='info'
							className='m-2 text-center shadow pointer text-capitalize'
							onClick={() => {
								setBookSelected(book.id); // Cập nhật local state
								setSelectedBookId(book.id); // Cập nhật state ở MainLayout
							}}
						>
							{book.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.books.nextCursor && (
					<Button
						onClick={loadMoreBooks}
						className='mt-3'
						style={{
							backgroundColor: '#6861ce',
							borderColor: '#6861ce',
						}}
					>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<BookDetails bookId={bookSelected} refetchBooks={handleBookDeleted} />
			</Col>
		</Row>
	);
};

export default BookList;
