import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteSinglePublisher } from '../graphql-client/mutation';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'react-toastify';

export default function BookDeleteButton({ publisherId, refetchPublishers }) {
	const [showModal, setShowModal] = useState(false);
	const [removePublisher] = useMutation(deleteSinglePublisher, {
		onCompleted: () => {
			toast.success('Deleted successful!');
			refetchPublishers(publisherId);
			setShowModal(false);
		},
		onError: () => {
			toast.error('Failed to delete...');
		},
	});

	const handleDelete = async () => {
		try {
			await removePublisher({
				variables: { deletePublisherId: publisherId },
			});
			console.log('Publisher deleted successfully');
		} catch (err) {
			console.error('Error deleting publisher:', err.message);
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
