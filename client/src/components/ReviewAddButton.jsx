import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReviewForm from './ReviewForm';

export default function ReviewAddButton({
	isDialogOpen,
	setIsDialogOpen,
	review,
	refetch,
	bookId,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<div>
			<Button variant='success' onClick={handleShow} className='me-3 mx-3'>
				Add new review
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add new Review</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReviewForm
						review={review}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
						refetch={refetch}
						bookId={bookId}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}
