import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'react-toastify';
import { MdRestoreFromTrash } from 'react-icons/md';

export default function UserDeleteButton({ userId, refetchUsers }) {
	const [showModal, setShowModal] = useState(false);
	const [removeBook] = useMutation(deleteUser, {
		onCompleted: () => {
			toast.success('Deleted successful!');
			refetchUsers(userId);
		},
		onError: () => {
			toast.error('Failed to delete...');
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: userId } });
			console.log('User deleted successfully: ', userId);
		} catch (err) {
			console.error('Error deleting user:', err.message);
		}
	};

	return (
		<>
			<Button
				variant='danger'
				className='me-3'
				title='Delete'
				onClick={() => setShowModal(true)}
			>
				<MdRestoreFromTrash />
			</Button>

			<ConfirmDeleteModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				handleConfirm={handleDelete}
			/>
		</>
	);
}
