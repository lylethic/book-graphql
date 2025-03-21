import { useLazyQuery, useMutation } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { getSingleTransaction } from '../../graphql-client/queries';
import { Button, Card, Modal } from 'react-bootstrap';
import UpsertTransaction from './upsert-transaction';

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

	const transaction = data ? data.transaction : null;

	return (
		<div>
			<Button variant='primary' onClick={handleShow}>
				Edit
			</Button>

			<Modal show={isOpen} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpsertTransaction transaction={transaction} />
				</Modal.Body>
			</Modal>
		</div>
	);
}
