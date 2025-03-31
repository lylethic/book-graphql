import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserUpdateForm from './UserUpdateForm';
import { FaPenSquare } from 'react-icons/fa';

export default function UpdateUserButton({
	isDialogOpen,
	setIsDialogOpen,
	user,
	refetchUsers,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button title='Edit' variant='primary' onClick={handleShow}>
				<FaPenSquare />
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
