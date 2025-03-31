import React, { useState } from 'react';
import UpsertTransactionForm from './upsert-transaction-form';
import { Button, Modal } from 'react-bootstrap';

export default function AddTransactionButton({ refetch }) {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<div>
			<Button variant='success' onClick={handleShow}>
				Add new transaction
			</Button>
			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpsertTransactionForm
						refetch={refetch}
						isDialogOpen={showModal}
						setIsDialogOpen={() => setShowModal(false)}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
