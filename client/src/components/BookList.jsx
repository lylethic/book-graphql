import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Row, Spinner } from 'react-bootstrap';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import BookAddButton from './BookAddButton';
import noImage from '../assets/no-image-available/no-img.png';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BookDeleteButton from './BookDeleteButton';
import UpdateBook from './BookUpdate';

const BookList = ({ setSelectedBookId }) => {
	const [bookSelected, setBookSelected] = useState(null);
	const [bookList, setBookList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const { loading, error, data, fetchMore, refetch } = useQuery(getBooks, {
		variables: { limit: 100, cursor: null },
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

	const loadMoreBooks = () => {
		fetchMore({
			variables: { cursor: data.books.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;
				return {
					books: {
						books: [...prevResult.books.books, ...fetchMoreResult.books.books],
						nextCursor: fetchMoreResult.books.nextCursor,
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

	if (loading) return <Spinner animation='border' />;
	if (error) {
		toast.error('Error loading books...');
		return <p>Error loading books...</p>;
	}

	return (
		<div>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>Books</h4>
				<BookAddButton refetch={refetch} />
			</div>
			<div className='d-flex flex-wrap gap-3 w-100 h-100'>
				{bookList.map((book) => (
					<div
						key={book.id}
						className={`d-flex flex-column align-items-center justify-content-between p-3 border rounded shadow ${
							bookSelected === book.id ? 'ouline-primary' : 'bg-light'
						}`}
						style={{ cursor: 'pointer', width: '150px' }}
						onClick={() => setBookSelected(book.id)}
					>
						<Image
							src={book.image || noImage}
							rounded
							width={100}
							height={100}
							alt={book.name}
						/>
						<Link
							to={`/books/${book.id}`}
							className='mt-2 text-center text-capitalize text-decoration-none'
						>
							{book.name}
						</Link>
						<div className='d-flex justify-content-center gap-2'>
							<BookDeleteButton
								bookId={book.id}
								refetchBooks={handleBookDeleted}
							/>
						</div>
					</div>
				))}
			</div>
			{data.books.nextCursor && (
				<Button
					onClick={loadMoreBooks}
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}
			{/* <BookDetails bookId={bookSelected} refetchBooks={handleBookDeleted} /> */}
		</div>
	);
};

export default BookList;
