import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteBook } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'react-toastify';
import { MdRestoreFromTrash } from 'react-icons/md';

export default function BookDeleteButton({ bookId, refetchBooks }) {
	const [showModal, setShowModal] = useState(false);
	const [removeBook] = useMutation(deleteBook, {
		onCompleted: () => {
			toast.success('Deleted successful!');
			refetchBooks(bookId);
			setShowModal(false); // Close modal after success
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: bookId } });
			console.log('Book deleted successfully');
		} catch (err) {
			toast.error('Failed to delete...');
			console.error('Error deleting book:', err.message);
		}
	};

	return (
		<>
			<Button variant='danger' onClick={() => setShowModal(true)}>
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
