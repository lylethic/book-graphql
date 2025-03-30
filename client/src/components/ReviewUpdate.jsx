import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import { FaPen } from 'react-icons/fa';

export default function UpdateReview({
	isDialogOpen,
	setIsDialogOpen,
	review,
	refetchReviews,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Review</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReviewForm
						review={review}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
