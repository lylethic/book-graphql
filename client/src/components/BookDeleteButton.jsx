import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteBook } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'react-toastify';

export default function BookDeleteButton({ bookId, refetchBooks }) {
	const [showModal, setShowModal] = useState(false);
	const [removeBook] = useMutation(deleteBook, {
		onCompleted: () => {
			toast.success('Deleted successful!');
			refetchBooks(bookId);
			setShowModal(false); // Close modal after success
		},
		onError: () => {
			toast.error('Failed to delete...');
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: bookId } });
			console.log('Book deleted successfully');
		} catch (err) {
			console.error('Error deleting book:', err.message);
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
