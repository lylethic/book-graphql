import React, { useState } from 'react';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';

const BookList = () => {
	const [bookSelected, setBookSelected] = useState(null);
	const { loading, error, data, refetch } = useQuery(getBooks);

	if (loading) return <p>Loading books...</p>;
	if (error) return <p>Error Loading books...</p>;

	const handleBookDeleted = (deletedBookId) => {
		if (bookSelected === deletedBookId) {
			setBookSelected(null);
		}
		refetch();
	};

	return (
		<Row>
			<Col xs={6}>
				<h4 className='my-2 text-capitalize'>books</h4>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.books.map((book) => (
						<Button
							variant='outline-primary'
							key={book.id}
							border='info'
							text='info'
							className='m-2 text-center shadow pointer text-capitalize'
							onClick={setBookSelected.bind(this, book.id)}
						>
							{book.name}
						</Button>
					))}
				</Card>
			</Col>
			<Col>
				<BookDetails bookId={bookSelected} refetchBooks={handleBookDeleted} />
			</Col>
		</Row>
	);
};

export default BookList;
