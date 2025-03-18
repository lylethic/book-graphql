import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import BookForm from './BookForm';

export default function BookAddButton({ book, refetch }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant='success' onClick={handleShow}>
				Add new book
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new Book</Modal.Title>
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
