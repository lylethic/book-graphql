import React, { useState } from 'react';
import UpsertTransactionForm from './upsert-transaction-form';
import { Button, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { returnBookTransation } from '../../graphql-client/mutation';
import { getAllTransactions } from '../../graphql-client/queries';

export default function UpdateTransactionButton({
	transactionId,
	refetchData,
}) {
	const [editTransaction, { loading }] = useMutation(returnBookTransation, {
		onCompleted: () => {
			if (refetchData) refetchData();
		},
		onError: (error) => {
			console.error('Return error:', error);
			alert('Error returning book.');
		},
		refetchQueries: [{ query: getAllTransactions }],
	});

	const handleReturnBook = async () => {
		try {
			await editTransaction({
				variables: {
					transactionId,
				},
			});
		} catch (err) {
			console.error('Mutation error:', err);
		}
	};

	return (
		<div>
			<Button variant='warning' onClick={handleReturnBook} disabled={loading}>
				{loading ? 'Returning...' : 'Return'}
			</Button>
		</div>
	);
}
