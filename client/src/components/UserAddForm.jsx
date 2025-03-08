import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getUsers } from '../graphql-client/queries';
import { createUser } from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';

export default function UserAddForm({ isDialogOpen, setIsDialogOpen, user }) {
	const [userData, setUser] = useState({
		id: '',
		name: '',
		email: '',
		password: '',
		role: '',
	});

	useEffect(() => {
		if (user) {
			setUser({
				id: user.id,
				name: user.name || '',
				email: user.email || '',
				password: user.password || '',
				role: user.role || '',
			});
		}
	}, [user]);

	const { id, name, email, password, role } = userData;

	const onInputChange = (event) => {
		setUser({ ...userData, [event.target.name]: event.target.value });
	};

	const { loading, data } = useQuery(getUsers);
	const [addNewUser] = useMutation(createUser, {
		onCompleted: () => {
			alert('User added succesfully!');
			setUser({ id: '', name: '', email: '', password: '', role: '' });
		},
		refetchQueries: [{ query: getUsers }],
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		await addNewUser({
			variables: { name, email, password, role },
		});
		setUser({ id: '', name: '', email: '', password: '', role: '' });
	};

	return (
		<Form onSubmit={onSubmit}>
			{user && (
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
					placeholder='Username...'
					name='name'
					value={name}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='email'
					placeholder='Email...'
					name='email'
					value={email}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='password'
					placeholder='Password...'
					name='password'
					value={password}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='role'
					placeholder='Role...'
					name='role'
					value={role}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Button className='float-right' variant='primary' type='submit'>
				Add User
			</Button>
		</Form>
	);
}
