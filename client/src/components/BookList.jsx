import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getBooks, searchBook } from '../graphql-client/queries';
import noImage from '../assets/no-image-available/no-img.png';
import { Button, Container, Image, Spinner } from 'react-bootstrap';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import BookAddButton from './BookAddButton';
import BookDeleteButton from './BookDeleteButton';
import BookSearchForm from './book-search-form';
import { toast } from 'react-toastify';

const BookList = () => {
	const [bookSelected, setBookSelected] = useState(null);
	const [searchQuery, setSearch] = useState('');
	// Memoized handleSearch to prevent unnecessary re-renders
	const handleSearch = useCallback((query) => {
		setSearch(query);
	}, []);

	// Query for fetching all books
	const { loading, error, data, fetchMore, refetch } = useQuery(getBooks, {
		variables: { limit: 21, cursor: null, search: '' },
		fetchPolicy: 'cache-and-network',

		onError: (error) => {
			toast.error(`Error loading books: ${error.message}`);
			console.error('GraphQL error:', error);
		},
	});

	// Query for searching books
	const { data: searchData, fetchMore: searchFetchMore } = useQuery(
		searchBook,
		{
			variables: { limit: 5, cursor: null, search: searchQuery },
			fetchPolicy: 'cache-first',
			skip: !searchQuery, // Skip if no search query
		}
	);

	// Load more books for getBooks query
	const loadMoreBooks = () => {
		fetchMore({
			variables: { cursor: data.books.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;
				const newBooks = fetchMoreResult.books.books.filter(
					(ng) => !prevResult.books.books.some((pg) => pg.id === ng.id)
				);
				return {
					books: {
						...fetchMoreResult.books,
						books: [...prevResult.books.books, ...newBooks],
					},
				};
			},
		});
	};

	// Load more search results for searchBook query
	const loadMoreSearch = () => {
		searchFetchMore({
			variables: {
				cursor: searchData.searchBook.nextCursor,
				limit: 5,
				search: searchQuery,
			},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;
				const newBooks = fetchMoreResult.searchBook.books.filter(
					(ng) => !prevResult.searchBook.books.some((pg) => pg.id === ng.id)
				);
				return {
					searchBook: {
						...fetchMoreResult.searchBook,
						books: [...prevResult.searchBook.books, ...newBooks],
					},
				};
			},
		});
	};

	// Handle book deletion
	const handleBookDeleted = (deletedBookId) => {
		if (bookSelected === deletedBookId) {
			setBookSelected(null);
		}
		refetch(); // Refetch to ensure list is up-to-date
	};

	// Memoize books to display to avoid recomputation
	const booksToDisplay = useMemo(() => {
		return searchQuery
			? searchData?.searchBook?.books || []
			: data?.books?.books || [];
	}, [searchQuery, searchData, data]);

	// Loading and error states
	if (loading) {
		return (
			<div className='d-flex justify-content-center align-items-center w-100 h-auto p-5'>
				<Spinner animation='border' />
			</div>
		);
	}

	return (
		<Container fluid>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>Books</h4>
				<BookAddButton refetch={refetch} />
			</div>
			<BookSearchForm onSearch={handleSearch} />
			<div
				className={`row g-3 ${
					booksToDisplay.length > 1 ? 'justify-content-center' : ''
				}`}
			>
				{booksToDisplay.length > 0 ? (
					booksToDisplay.map((book) => (
						<div
							key={book.id}
							className={`mx-lg-2 mx-0 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center justify-content-between p-3 border rounded shadow ${
								bookSelected === book.id ? 'outline-primary' : 'bg-light'
							}`}
							style={{
								overflow: 'hidden',
								minHeight: '300px',
							}}
							onClick={() => setBookSelected(book.id)}
						>
							<Image
								src={book.image || noImage}
								rounded
								width={'auto'}
								height={150}
								alt={book.name}
							/>
							<div
								style={{
									width: '100%',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									textAlign: 'center',
								}}
							>
								<Link
									to={`/books/${book.id}`}
									className='mt-2 text-center text-capitalize text-decoration-none'
								>
									{book.name}
								</Link>
							</div>
							<div className='d-flex justify-content-center gap-2'>
								<BookDeleteButton
									bookId={book.id}
									refetchBooks={handleBookDeleted}
								/>
							</div>
						</div>
					))
				) : (
					<p>
						{searchQuery
							? `No books found for "${searchQuery}".`
							: 'No books available.'}
					</p>
				)}
			</div>

			{/* Load More Buttons */}
			{!searchQuery && data?.books?.nextCursor && (
				<Button
					onClick={loadMoreBooks}
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}
			{searchQuery && searchData?.searchBook?.nextCursor && (
				<Button
					onClick={loadMoreSearch}
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}
		</Container>
	);
};

export default BookList;
