import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { deleteAuthor } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function AuthorDeleteButton({ authorId, refetchAuthors }) {
	const [showModal, setShowModal] = useState(false);

	const [removeBook] = useMutation(deleteAuthor, {
		onCompleted: () => {
			refetchAuthors(authorId);
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: authorId } });
			console.log('Author deleted successfully');
		} catch (err) {
			console.error('Error deleting author:', err.message);
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
