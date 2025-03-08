import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function UserDeleteButton({ userId, refetchUsers }) {
	const [showModal, setShowModal] = useState(false);
	const [removeBook] = useMutation(deleteUser, {
		onCompleted: () => {
			refetchUsers(userId);
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: userId } });
			console.log('User deleted successfully');
		} catch (err) {
			console.error('Error deleting user:', err.message);
		}
	};

	return (
		<>
			<Button
				className='me-3'
				variant='danger'
				onClick={() => setShowModal(true)}
			>
				Delete
			</Button>

			<ConfirmDeleteModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				handleConfirm={handleDelete}
			/>
		</>
	);
}
