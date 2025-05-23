import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AuthorForm from './AuthorForm';
import { MdAdd, MdPlusOne } from 'react-icons/md';

export default function AuthorAddButton({ author, refetch }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<div>
			<Button variant='success' onClick={handleShow}>
				<MdAdd /> Add new author
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new author</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AuthorForm
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
