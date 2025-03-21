import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { deleteTransaction } from '../../graphql-client/mutation';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { toast } from 'react-toastify';

export default function TransactionDeleteButton({
	transactionId,
	refetchData,
}) {
	const [showModal, setShowModal] = useState(false);
	const [removeTransaction] = useMutation(deleteTransaction, {
		onCompleted: () => {
			toast.success('Deleted succssful!');
			refetchData();
			setShowModal(false);
		},
		onError: (error) => {
			toast.error('Failed to delete transaction');
		},
	});

	const handleConfirm = async () => {
		try {
			await removeTransaction({ variables: { id: transactionId } });
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
