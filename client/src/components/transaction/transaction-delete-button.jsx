import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { deleteTransaction } from '../../graphql-client/mutation';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

export default function TransactionDeleteButton({
	transactionId,
	refetchData,
}) {
	const [showModal, setShowModal] = useState(false);
	const [removeTransaction] = useMutation(deleteTransaction, {
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
			await removeTransaction({ variables: { id: transactionId } });
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
