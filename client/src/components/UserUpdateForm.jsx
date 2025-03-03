import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { updateUser } from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';

const UserUpdateForm = ({ isDialogOpen, setIsDialogOpen, user }) => {
	const [userData, setUserData] = useState({
		id: '',
		name: '',
		email: '',
		role: '',
	});

	// Update form when a book is passed (edit mode)
	useEffect(() => {
		if (user) {
			setUserData({
				id: user.id,
				name: user.name || '',
				email: user.email || '',
				role: user.role || '',
			});
		}
	}, [user]);

	const { id, name, email, role } = userData;

	const onInputChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const [editUser] = useMutation(updateUser);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (user) {
			// Update existing
			await editUser({
				variables: {
					id: user.id,
					name,
					email,
					role,
				},
			});
			setIsDialogOpen(false);
			console.log({
				id: user.id,
				name,
				email,
				role,
			});
		}
		setUserData({ id: '', name: '', email: '', role: '' });
	};

	return (
		<Form onSubmit={onSubmit}>
			<h4>{user ? '' : 'Add new user'}</h4>
			{user && (
				<Form.Group>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='UserId...'
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
					placeholder=' Username...'
					name='name'
					value={name}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Email...'
					name='email'
					value={email}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder=' role...'
					name='role'
					value={role}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Button className='float-right' variant='primary' type='submit'>
				{user ? 'Update Book' : 'Add Book'}
			</Button>
		</Form>
	);
};

export default UserUpdateForm;
