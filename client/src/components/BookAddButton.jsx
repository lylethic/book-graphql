import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import BookForm from './BookForm';

export default function BookAddButton({
	isDialogOpen,
	setIsDialogOpen,
	book,
	refetch,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant='primary' onClick={handleShow} className='rounded-5'>
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
