import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteSingleReview } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { FaTrash } from 'react-icons/fa';

export default function ReviewDeleteButton({ reviewId, refetchReviews }) {
	const [showModal, setShowModal] = useState(false);
	const [removeReview] = useMutation(deleteSingleReview, {
		onCompleted: () => {
			refetchReviews(reviewId);
			setShowModal(false); // Close modal after success
		},
	});

	const handleDelete = async () => {
		try {
			await removeReview({
				variables: { ids: [reviewId] },
			});
			console.log('Review deleted successfully');
		} catch (err) {
			console.error('Error deleting review:', err.message);
		}
	};

	return (
		<>
			<Button
				className='me-3'
				variant='danger'
				onClick={() => setShowModal(true)}
			>
				<FaTrash />
			</Button>

			<ConfirmDeleteModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				handleConfirm={handleDelete}
			/>
		</>
	);
}
