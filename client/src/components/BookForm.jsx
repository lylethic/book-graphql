import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthors, getBooks } from '../graphql-client/queries';
import { addSingleBook } from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';

const BookForm = () => {
	const [newBook, setNewBook] = useState({
		name: '',
		genre: '',
		authorId: '',
	});

	const { name, genre, authorId } = newBook;

	const onInputChange = (event) => {
		setNewBook({
			...newBook,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addBook({
			variables: { name, genre, authorId },
			refetchQueries: [{ query: getBooks }],
		});

		setNewBook({ name: '', genre: '', authorId: '' });
	};

	//GraphQL operations
	const { loading, data } = useQuery(getAuthors);
	const [addBook, dataMutation] = useMutation(addSingleBook);

	console.log(dataMutation);

	return (
		<Form onSubmit={onSubmit}>
			<h4>Add new book</h4>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Book name...'
					name='name'
					value={name}
					onChange={onInputChange}
				></Form.Control>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Book genre...'
					name='genre'
					value={genre}
					onChange={onInputChange}
				></Form.Control>
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
						{data.authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
					</Form.Select>
				)}
			</Form.Group>

			<Button className='float-right' variant='primary' type='submit'>
				Add Book
			</Button>
		</Form>
	);
};

export default BookForm;
