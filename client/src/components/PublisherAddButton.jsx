import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PublisherForm from './PublisherForm';

export default function PublisherAddButton({ publisher, refetch }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<div>
			<Button variant='success' onClick={handleShow}>
				Add new publisher
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new Publisher</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PublisherForm
						publisher={publisher}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
