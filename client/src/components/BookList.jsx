import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import BookAddButton from './BookAddButton';

const BookList = ({ setSelectedBookId }) => {
	const [bookSelected, setBookSelected] = useState(null);
	const [bookList, setBookList] = useState([]);

	const { loading, error, data, fetchMore } = useQuery(getBooks, {
		variables: { limit: 10, cursor: null },
	});

	useEffect(() => {
		if (data) {
			setBookList((prev) => {
				const newBooks = data.books.books.filter(
					(ng) => !prev.some((pg) => pg.id === ng.id)
				);
				return [...prev, ...newBooks];
			});
		}
	}, [data]);

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
		setBookList((prev) => prev.filter((g) => g.id !== deletedBookId));
	};

	if (loading) return <p>Loading books...</p>;
	if (error) return <p>Error Loading books...</p>;

	return (
		<Row>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>books</h4>
				<BookAddButton />
			</div>
			<Col xs={12} md={6} className='mb-3 mb-lg-0'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{bookList.map((book) => (
						<Button
							variant={bookSelected === book.id ? 'primary' : 'outline-primary'}
							key={book.id}
							border='info'
							text='info'
							className='m-2 shadow text-capitalize text-center pointer'
							onClick={() => {
								setBookSelected(book.id);
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
