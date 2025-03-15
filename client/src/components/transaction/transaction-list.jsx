import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Row, Col, CardGroup, Button, Table } from 'react-bootstrap';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { getAllTransactions } from '../../graphql-client/queries';

const TransactionList = () => {
	const [transactionSelected, setTransactionSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(
		getAllTransactions,
		{
			variables: { limit: 5, cursor: null },
		}
	);

	if (loading) return <p>Loading transactions...</p>;
	if (error) return <p>Error Loading transactions...</p>;

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp, 10));
		return date.toLocaleDateString();
	};

	// Function to load more authors
	const loadMoreTransactions = () => {
		fetchMore({
			variables: { cursor: data.authors.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					transactions: {
						transactions: [
							...prevResult.transactions.transactions,
							...fetchMoreResult.transactions.transactions,
						],
						nextCursor: fetchMoreResult.transactions.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handleTransactionDeleted = (id) => {
		if (transactionSelected === id) {
			setTransactionSelected(null);
		}
		refetch();
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>ID</th>
					<th>User</th>
					<th>Book</th>
					<th>Borrow Date</th>
					<th>Due Date</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{data.transactions.transactions.map((transaction) => (
					<tr key={transaction.id}>
						<td>{transaction.id}</td>
						<td>{transaction.userId ? transaction.userId.name : 'N/A'}</td>
						<td>{transaction.bookId.name}</td>
						<td>{formatDate(transaction.borrowDate)}</td>
						<td>{formatDate(transaction.dueDate)}</td>
						<td>{transaction.status}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default TransactionList;
