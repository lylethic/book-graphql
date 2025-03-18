import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { deleteSingleFine } from '../../graphql-client/mutation';
import { Button } from 'react-bootstrap';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

export default function DeleteFineButton({ fineId, refetchData }) {
	const [showModal, setShowModal] = useState(false);
	const [removeFine] = useMutation(deleteSingleFine, {
		onCompleted: () => {
			refetchData();
			setShowModal(false);
		},
		onError: (error) => {
			console.error('Failed to delete transaction:', error.message);
		},
	});

	const handleConfirm = async () => {
		try {
			await removeFine({ variables: { fineId } });
			console.log('Deleted successfully');
		} catch (error) {
			console.error('Error deleting transaction');
		}
	};

	return (
		<div>
			<Button variant='danger' onClick={() => setShowModal(true)}>
				Delete
			</Button>
			<ConfirmDeleteModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				handleConfirm={handleConfirm}
			/>
		</div>
	);
}
