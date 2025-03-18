import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserAddForm from './UserAddForm';

export default function UserAddButton({ user, refetch }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<div>
			<Button variant='success' onClick={handleShow}>
				Add new user
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UserAddForm
						user={user}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
