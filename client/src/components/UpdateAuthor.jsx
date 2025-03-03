import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import BookForm from './BookForm';
import AuthorUpdateForm from './AuthorFormUpdate';

export default function UpdateAuthor({
	isDialogOpen,
	setIsDialogOpen,
	author,
	refetchAuthors,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant='primary' onClick={handleShow}>
				Edit
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Author</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AuthorUpdateForm
						author={author}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
