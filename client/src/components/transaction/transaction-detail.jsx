import { useQuery } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { getSingleTransaction } from '../../graphql-client/queries';
import { Button, Card, Modal } from 'react-bootstrap';

export default function TransactionDetail({ transactionId, refetch }) {
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data } = useQuery(getSingleTransaction, {
		variables: {
			transactionId,
		},
		skip: transactionId === null,
	});

	if (loading) return <p>Loading transaction details...</p>;
	if (error) {
		console.log(error.message);
		return <p>Error Loading transaction details!</p>;
	}

	const handleClose = () => setIsOpen(false);
	const handleShow = () => setIsOpen(true);

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp, 10));
		return date.toLocaleDateString();
	};

	const transaction = transactionId !== null ? data.transaction : null;

	return (
		<div>
			<Button variant='primary' onClick={handleShow}>
				Detail
			</Button>

			<Modal show={isOpen} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Transaction details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Card text='black' className='shadow'>
						<Card.Body>
							{!transaction ? (
								<Card.Text>Not found transaction</Card.Text>
							) : (
								<Fragment>
									<Card.Text className='fw-bold'>
										Book: {transaction.bookId ? transaction.bookId.name : null}
									</Card.Text>
									<Card.Text>
										Borrower:{' '}
										{transaction.userId ? transaction.userId.name : null}
									</Card.Text>
									<Card.Text>
										Borrow date: {formatDate(transaction.borrowDate)}
									</Card.Text>
									<Card.Text>
										Due date: {formatDate(transaction.dueDate)}
									</Card.Text>
									<Card.Text>
										Return date: {formatDate(transaction.returnDate)}
									</Card.Text>
									<Card.Text>Status: {transaction.Status}</Card.Text>
								</Fragment>
							)}
						</Card.Body>
					</Card>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
