import React, { useState } from 'react';
import UpsertTransaction from './upsert-transaction';
import { Button, Modal } from 'react-bootstrap';

export default function AddTransactionButton() {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<div>
			<Button variant='primary' onClick={handleShow} className='rounded-5'>
				Add new transaction
			</Button>
			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpsertTransaction
						isDialogOpen={showModal}
						setIsDialogOpen={() => setShowModal(false)}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
