import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { addSingleAuthor } from '../graphql-client/mutation';

import { Form, FormLabel } from 'react-bootstrap';

const AuthorForm = () => {
	const [newAuthor, setNewAuthor] = useState({
		name: '',
		age: '',
	});

	const { name, age } = newAuthor;

	const onInputChange = (event) => {
		setNewAuthor({
			...newAuthor,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addAuthor({
			variables: { name, age: parseInt(age) },
			refetchQueries: [{ query: getAuthors }],
		});
		console.log(newAuthor);
		setNewAuthor({ name: '', age: '' });
	};

	//GraphQL operations
	const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

	return (
		<Form>
			<h4>Add new author</h4>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Author name...'
					name='name'
					value={name}
					onChange={onInputChange}
				></Form.Control>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='number'
					placeholder='Author age...'
					name='age'
					value={age}
					onChange={onInputChange}
				></Form.Control>
			</Form.Group>
			<button
				className='btn btn-primary border-0 float-end rounded-1 p-2'
				variant='info'
				type='submit'
				onClick={onSubmit}
			>
				Add Author
			</button>
		</Form>
	);
};

export default AuthorForm;
