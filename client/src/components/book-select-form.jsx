import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { getBooks } from '../graphql-client/queries';

const BookDropdown = ({ control, errors }) => {
	const dropdownRef = useRef(null);
	const [cursor, setCursor] = useState(null);

	// Fetch initial books with cursor-based pagination
	const { data, loading, fetchMore } = useQuery(getBooks, {
		variables: { limit: 50, cursor: null },
		fetchPolicy: 'cache-and-network',
	});

	const books = data?.books?.books || [];
	const nextCursor = data?.books?.nextCursor;

	useEffect(() => {
		setCursor(nextCursor);
	}, [nextCursor]);

	// Handle scroll event
	const handleScroll = () => {
		const dropdown = dropdownRef.current;
		if (
			dropdown &&
			dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight
		) {
			if (cursor) {
				fetchMore({
					variables: { limit: 50, cursor },
					updateQuery: (prev, { fetchMoreResult }) => {
						if (!fetchMoreResult) return prev;
						return {
							books: {
								...fetchMoreResult.books,
								books: [...prev.books.books, ...fetchMoreResult.books.books],
							},
						};
					},
				});
			}
		}
	};

	return (
		<Form.Group className='mb-3'>
			<Form.Label>Book</Form.Label>
			{loading && books.length === 0 ? (
				<p>Loading books...</p>
			) : (
				<Controller
					name='bookId'
					control={control}
					rules={{ required: 'Please select a book.' }}
					render={({ field }) => (
						<Form.Select
							{...field}
							className='text-capitalize'
							ref={dropdownRef}
							onScroll={handleScroll}
							style={{ maxHeight: '200px', overflowY: 'auto' }} // Enable scrolling
							isInvalid={!!errors.bookId}
						>
							<option value=''>Please select a book...</option>
							{books.map((key) => (
								<option key={key.id} value={key.id} className='text-capitalize'>
									{key.name}
								</option>
							))}
						</Form.Select>
					)}
				/>
			)}
			{errors.bookId && (
				<Form.Control.Feedback type='invalid'>
					{errors.bookId?.message}
				</Form.Control.Feedback>
			)}
		</Form.Group>
	);
};

export default BookDropdown;
