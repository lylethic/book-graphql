import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Deletion</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete?</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='danger' onClick={handleConfirm}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmDeleteModal;
