import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Button, Form, Badge } from 'react-bootstrap';
import { getAllTransactions } from '../../graphql-client/queries';
import TransactionDetail from './transaction-detail';
import TransactionDeleteButton from './transaction-delete-button';
import AddTransactionButton from './add-transaction-button';
import UpdateTransactionButton from './update-transaction-button';
import FineAddButton from './fine-add-button';

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
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>transactions</h4>
				<AddTransactionButton />
			</div>
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
			<div className='table-responsive-lg'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Book</th>
							<th>Borrow Date</th>
							<th>Due Date</th>
							<th>Return Date</th>
							<th>Status</th>
							<th>Features</th>
						</tr>
					</thead>
					<tbody>
						{data.transactions &&
							data.transactions.transactions.map((transaction) => (
								<tr key={transaction.id}>
									<td>{transaction.id}</td>
									<td>
										{transaction.userId ? transaction.userId.name : 'N/A'}
									</td>
									<td>{transaction.bookId.name}</td>
									<td>{formatDate(transaction.borrowDate)}</td>
									<td>{formatDate(transaction.dueDate)}</td>
									<td>
										{transaction.returnDate
											? formatDate(transaction.returnDate)
											: ''}
									</td>
									<td className='text-capitalize'>
										<Badge
											bg={
												transaction.status === 'overdue' ? 'danger' : 'primary'
											}
										>
											{transaction.status}
										</Badge>
									</td>
									<td className='d-flex flex-wrap align-items-center gap-2'>
										<TransactionDetail transactionId={transaction.id} />
										<TransactionDeleteButton
											transactionId={transaction.id}
											refetchData={refetch}
										/>
										{!transaction.returnDate && (
											<UpdateTransactionButton
												transactionId={transaction.id}
												refetchData={refetch}
											/>
										)}
										{transaction.returnDate &&
											transaction.status === 'overdue' && (
												<FineAddButton
													transactionId={transaction.id}
													userId={transaction.userId.id}
												/>
											)}
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
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
