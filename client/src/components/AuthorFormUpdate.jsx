import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { addSingleAuthor, updateAuthor } from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';

const AuthorUpdateForm = ({ isDialogOpen, setIsDialogOpen, author }) => {
	const [authorData, setAuthorData] = useState({
		id: '',
		name: '',
		age: '',
	});

	// Update form when a book is passed (edit mode)
	useEffect(() => {
		if (author) {
			setAuthorData({
				id: author.id,
				name: author.name || '',
				age: author.age || '',
			});
		}
	}, [author]);

	const { id, name, age } = authorData;

	const onInputChange = (event) => {
		let { name, value } = event.target;

		if (name === 'age') {
			value = value ? parseInt(value, 10) : '';
		}

		setAuthorData({ ...authorData, [name]: value });
	};
	// GraphQL operations
	const [addAuthor] = useMutation(addSingleAuthor, {
		refetchQueries: [{ query: getAuthors }],
	});
	const [editAuthor] = useMutation(updateAuthor);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (author) {
			// Update existing book
			await editAuthor({
				variables: {
					id: author.id,
					name,
					age,
				},
			});
			setIsDialogOpen(false);
			console.log({
				id: author.id,
				name,
				age,
			});
		} else {
			await addAuthor({
				variables: { name, age },
			});
		}
		setAuthorData({ id: '', name: '', age: '' });
	};

	return (
		<Form onSubmit={onSubmit}>
			<h4>{author ? '' : 'Add New Author'}</h4>
			{author && (
				<Form.Group>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='AuthorId...'
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
					placeholder='Author name...'
					name='name'
					value={name}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Control
					className='mb-2'
					type='number'
					placeholder='Age...'
					name='age'
					value={age}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Button className='float-right' variant='primary' type='submit'>
				{author ? 'Update Author' : 'Add Author'}
			</Button>
		</Form>
	);
};

export default AuthorUpdateForm;
