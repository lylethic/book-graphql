import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import BookForm from './BookForm';

export default function UpdateBook({
	isDialogOpen,
	setIsDialogOpen,
	book,
	refetchBooks,
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
					<Modal.Title>Update Book</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<BookForm
						book={book}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
