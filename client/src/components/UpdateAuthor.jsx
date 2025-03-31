import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import BookForm from './BookForm';
import AuthorUpdateForm from './AuthorFormUpdate';
import { FaPencilRuler } from 'react-icons/fa';
import AuthorForm from './AuthorForm';

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
				<FaPencilRuler /> Edit
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
					<AuthorForm
						author={author}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
