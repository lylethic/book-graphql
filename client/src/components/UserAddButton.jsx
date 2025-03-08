import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserAddForm from './UserAddForm';

export default function UserAddButton({
	isDialogOpen,
	setIsDialogOpen,
	user,
	refetch,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant='primary' onClick={handleShow} className='rounded-5'>
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
		</>
	);
}
