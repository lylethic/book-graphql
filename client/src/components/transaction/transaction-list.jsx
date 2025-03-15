import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Button, Form } from 'react-bootstrap';
import { getAllTransactions } from '../../graphql-client/queries';
import TransactionDetail from './transaction-detail';
import TransactionDeleteButton from './transaction-delete-button';
import AddTransactionButton from './add-transaction-button';

const TransactionsList = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const { loading, error, data, fetchMore, refetch } = useQuery(
		getAllTransactions,
		{
			variables: { limit: 5, cursor: null, status: filterStatus },
		}
	);

	if (loading) return <p>Loading transactions...</p>;
	if (error) return <p>Error loading transactions...</p>;

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp, 10));
		return date.toLocaleDateString();
	};

	const loadMoreTransactions = () => {
		fetchMore({
			variables: {
				cursor: data.transactions.nextCursor,
				limit: 5,
				status: filterStatus,
			},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					transactions: {
						transactions: [
							...prevResult.transactions.transactions,
							...fetchMoreResult.transactions.transactions,
						],
						nextCursor: fetchMoreResult.transactions.nextCursor,
					},
				};
			},
		});
	};

	return (
		<div>
			<h4 className='my-2 text-capitalize'>transactions</h4>
			<AddTransactionButton />
			<Form.Group controlId='statusFilter' className='my-2'>
				<Form.Label className='fst-italic fw-bold'>
					Filter by Status:
				</Form.Label>
				<Form.Control
					as='select'
					value={filterStatus}
					onChange={(e) => {
						setFilterStatus(e.target.value);
						refetch({ status: e.target.value, cursor: null, limit: 5 });
					}}
				>
					<option value=''>All</option>
					<option value='borrowed'>Borrowed</option>
					<option value='returned'>Returned</option>
					<option value='overdue'>Overdue</option>
				</Form.Control>
			</Form.Group>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>User</th>
						<th>Book</th>
						<th>Borrow Date</th>
						<th>Due Date</th>
						<th>Status</th>
						<th>Features</th>
					</tr>
				</thead>
				<tbody>
					{data.transactions &&
						data.transactions.transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.id}</td>
								<td>{transaction.userId ? transaction.userId.name : 'N/A'}</td>
								<td>{transaction.bookId.name}</td>
								<td>{formatDate(transaction.borrowDate)}</td>
								<td>{formatDate(transaction.dueDate)}</td>
								<td>{transaction.status}</td>
								<td className='flex align-items-center justify-content-between gap-2'>
									<TransactionDetail transactionId={transaction.id} />
									<TransactionDeleteButton
										transactionId={transaction.id}
										refetchData={refetch}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
			{data.transactions.nextCursor && (
				<Button
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
					onClick={loadMoreTransactions}
					variant='primary'
				>
					Load More
				</Button>
			)}
		</div>
	);
};

export default TransactionsList;
