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
				Create fines
			</Button>
			<Modal show={isOpen} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create fines</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FineAddForm transactionId={transactionId} userId={userId} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
