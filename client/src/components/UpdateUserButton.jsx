import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserUpdateForm from './UserUpdateForm';
import { FaPenSquare } from 'react-icons/fa';

export default function UpdateUserButton({ user, refetchUsers }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
						refetchUsers={refetchUsers} // Pass refetchUsers if needed by UserUpdateForm
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
