import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ListGroup, Card, Badge, Modal, Button } from 'react-bootstrap';
import { getAllFines } from '../../graphql-client/queries';
import UpdateFine from './update-fine';
import DeleteFineButton from './delete-fine';

const FineList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);
	const handleShow = () => setIsOpen(true);

	const { data, loading, error, refetch } = useQuery(getAllFines, {
		variables: { limit: 5, cursor: null },
	});

	const fines = data?.fines?.fines || [];
	if (loading) return <p>Loading fines...</p>;
	if (error) return <p>Error loading fines...</p>;

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp));
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<Card className='my-4 shadow'>
			<Card.Header as='h5'>Fines List</Card.Header>
			<ListGroup variant='flush'>
				{fines.map((fine) => (
					<ListGroup.Item key={fine.id}>
						<div className='d-flex justify-content-between align-items-start'>
							<div>
								<h6>
									Book: <strong>{fine.transactionId.bookId.name}</strong>
								</h6>
								<p className='mb-1'>
									Author: {fine.transactionId.bookId.author.name} | Genre:{' '}
									{fine.transactionId.bookId.genre.name}
								</p>
								<p className='mb-1'>
									Issued to: {fine.userId.name} | Date:{' '}
									{formatDate(fine.issuedDate)}
								</p>
								<p className='mb-0'>
									Amount: <strong>${fine.amount}</strong>
								</p>
							</div>
							<Badge bg={fine.status === 'paid' ? 'success' : 'warning'} pill>
								{fine.status.toUpperCase()}
							</Badge>
						</div>
						<div className='d-flex gap-2'>
							<Button variant='primary' onClick={handleShow}>
								Edit
							</Button>
							<Modal
								show={isOpen}
								onHide={handleClose}
								backdrop='static'
								keyboard={false}
							>
								<Modal.Header closeButton>
									<Modal.Title>Update</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<UpdateFine fineId={fine.id} />
								</Modal.Body>
							</Modal>
							<DeleteFineButton fineId={fine.id} refetchData={refetch} />
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
	);
};

export default FineList;
