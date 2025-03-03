import { useMutation } from '@apollo/client';
import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../graphql-client/mutation';

export default function UserDeleteButton({ userId, refetchUsers }) {
	const [removeBook] = useMutation(deleteUser, {
		onCompleted: () => {
			refetchUsers(userId);
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: userId } });
			console.log('Book deleted successfully');
		} catch (err) {
			console.error('Error deleting book:', err.message);
		}
	};

	return (
		<Button className='me-3' variant='danger' onClick={handleDelete}>
			Delete
		</Button>
	);
}
