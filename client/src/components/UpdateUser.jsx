import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import BookForm from './BookForm';
import UserUpdateForm from './UserUpdateForm';

export default function UpdateUser({
	isDialogOpen,
	setIsDialogOpen,
	user,
	refetchUsers,
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
					<Modal.Title>Update User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UserUpdateForm
						user={user}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
