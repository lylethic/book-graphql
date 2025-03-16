import React from "react";
import { Button, Modal } from "react-bootstrap";
import PublisherForm from "./PublisherForm";

export default function PublisherAddButton({
	isDialogOpen,
	setIsDialogOpen,
	publisher,
	refetch,
}) {
	const handleClose = () => setIsDialogOpen(false);
	const handleShow = () => setIsDialogOpen(true);

	return (
		<>
			<Button
				variant="primary"
				onClick={handleShow}
				className="rounded-5">
				Add new publisher
			</Button>
			<Modal
				show={isDialogOpen}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add new Publisher</Modal.Title>
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
