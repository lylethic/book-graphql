import React, { useState } from 'react';
import FineAddForm from './fine-add-form';
import { Button, Modal } from 'react-bootstrap';

export default function FineAddButton({ transactionId, userId }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);
	const handleShow = () => setIsOpen(true);

	return (
		<div>
			<Button variant='secondary' onClick={handleShow}>
				Fines
			</Button>
			<Modal show={isOpen} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create fine</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FineAddForm transactionId={transactionId} userId={userId} />
				</Modal.Body>
			</Modal>
		</div>
	);
}
