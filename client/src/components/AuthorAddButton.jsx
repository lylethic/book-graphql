import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import AuthorForm from './AuthorForm';

export default function AuthorAddButton({
	isDialogOpen,
	setIsDialogOpen,
	author,
	refetch,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant='primary' onClick={handleShow} className='rounded-5'>
				Add new author
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
						user={author}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
