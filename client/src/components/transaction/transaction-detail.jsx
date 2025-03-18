import { useLazyQuery } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { getSingleTransaction } from '../../graphql-client/queries';
import { Button, Card, Modal } from 'react-bootstrap';

export default function TransactionDetail({ transactionId }) {
	const [isOpen, setIsOpen] = useState(false);

	// Lazy query
	const [fetchTransaction, { loading, error, data }] =
		useLazyQuery(getSingleTransaction);

	const handleClose = () => setIsOpen(false);

	const handleShow = () => {
		fetchTransaction({
			variables: { transactionId },
			fetchPolicy: 'network-only',
		});
		setIsOpen(true);
	};

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp, 10));
		return date.toLocaleDateString();
	};

	const transaction = data ? data.transaction : null;

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
					{loading && <p>Loading transaction details...</p>}
					{error && <p>Error loading transaction details!</p>}
					<Card text='black' className='shadow'>
						<Card.Body>
							{!transaction ? (
								<Card.Text>No transaction data available</Card.Text>
							) : (
								<Fragment>
									<Card.Text className='fw-bold'>
										Book: {transaction.bookId?.name || 'N/A'}
									</Card.Text>
									<Card.Text>
										Borrower: {transaction.userId?.name || 'N/A'}
									</Card.Text>
									<Card.Text>
										Borrow date: {formatDate(transaction.borrowDate)}
									</Card.Text>
									<Card.Text>
										Due date: {formatDate(transaction.dueDate)}
									</Card.Text>
									<Card.Text>
										Return date:{' '}
										{transaction.returnDate
											? formatDate(transaction.returnDate)
											: 'Not Returned'}
									</Card.Text>
									<Card.Text>Status: {transaction.status}</Card.Text>
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
