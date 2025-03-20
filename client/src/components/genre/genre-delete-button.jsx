import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { deleteGenre } from '../../graphql-client/mutation';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { toast } from 'react-toastify';

export default function GenreDeleteButton({ genreId, refetchData }) {
	const [showModal, setShowModal] = useState(false);
	const [removeGenre] = useMutation(deleteGenre, {
		onCompleted: () => {
			refetchData(genreId);
			setShowModal(false);
			toast.success('Genre deleted successfully!');
		},
		onError: (error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
	});

	const handleDelete = async () => {
		try {
			await removeGenre({ variables: { id: genreId } });
			console.log('Genre deleted successfully');
		} catch (err) {
			console.error('Error deleting genre:', err.message);
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
