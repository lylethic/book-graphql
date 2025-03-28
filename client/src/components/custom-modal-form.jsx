import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CustomModal({ isOpen, onClose, title, children }) {
	return (
		<Modal show={isOpen} onHide={onClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
