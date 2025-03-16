import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PublisherForm from "./PublisherForm";

export default function updatePublisher({
	isDialogOpen,
	setIsDialogOpen,
	publisher,
	refetchPublisgers,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Edit
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Publisher</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PublisherForm
						publisher={publisher}
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
