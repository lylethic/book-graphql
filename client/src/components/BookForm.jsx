import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthors, getBooks } from '../graphql-client/queries';
import { addSingleBook, updateBook } from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';
import GenreSelectForm from './genre-select-form';

const BookForm = ({ isDialogOpen, setIsDialogOpen, book }) => {
	const [bookData, setBookData] = useState({
		id: '',
		name: '',
		genre: '',
		authorId: '',
	});

	// Update form when a book is passed (edit mode)
	useEffect(() => {
		if (book) {
			setBookData({
				id: book.id,
				name: book.name || '',
				genre: book.genre?.id || '',
				authorId: book.author?.id || '',
			});
		}
	}, [book]);

	const { id, name, genre, authorId } = bookData;

	const onInputChange = (event) => {
		setBookData({ ...bookData, [event.target.name]: event.target.value });
	};

	const onGenreChange = (selectedGenre) => {
		setBookData((prevBook) => ({ ...prevBook, genre: selectedGenre }));
	};

	// GraphQL operations
	const { loading, data } = useQuery(getAuthors);
	const [addBook] = useMutation(addSingleBook, {
		refetchQueries: [{ query: getBooks }],
	});
	const [editBook] = useMutation(updateBook);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (book) {
			// Update existing book
			await editBook({
				variables: {
					id: book.id,
					name,
					genre,
					authorId,
				},
			});
			setIsDialogOpen(false);
			console.log({
				id: book.id,
				name,
				genre,
				authorId,
			});
		} else {
			await addBook({
				variables: { name, genre, authorId },
			});
		}
		setBookData({ id: '', name: '', genre: '', authorId: '' });
	};

	return (
		<Form onSubmit={onSubmit}>
			<h4>{book ? '' : 'Add New Book'}</h4>
			{book && (
				<Form.Group>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='BookId...'
						name='id'
						value={id}
						onChange={onInputChange}
						disabled
					/>
				</Form.Group>
			)}
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Book name...'
					name='name'
					value={name}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-2'>
				<GenreSelectForm
					selectedGenre={genre}
					onSelectedGenre={onGenreChange}
				/>
			</Form.Group>

			<Form.Group className='mb-2'>
				{loading ? (
					<p>Loading authors...</p>
				) : (
					<Form.Select
						name='authorId'
						value={authorId}
						onChange={onInputChange}
						required
					>
						<option value='' disabled>
							Select author
						</option>
						{data?.authors.authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
					</Form.Select>
				)}
			</Form.Group>

			<Button className='float-right' variant='primary' type='submit'>
				{book ? 'Update Book' : 'Add Book'}
			</Button>
		</Form>
	);
};

export default BookForm;
