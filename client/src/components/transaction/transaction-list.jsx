import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
	Table,
	Button,
	Form,
	Badge,
	Spinner,
	Container,
} from 'react-bootstrap';
import { getAllTransactions } from '../../graphql-client/queries';
import TransactionDetail from './transaction-detail';
import TransactionDeleteButton from './transaction-delete-button';
import AddTransactionButton from './add-transaction-button';
import UpdateTransactionButton from './update-transaction-button';
import FineAddButton from './fine-add-button';
import { toast } from 'react-toastify';

const TransactionsList = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const { loading, error, data, fetchMore, refetch } = useQuery(
		getAllTransactions,
		{
			variables: { limit: 5, cursor: null, status: filterStatus },
		}
	);

	if (loading)
		return (
			<div className='d-flex align-items-center justify-content-center my-4 w-100'>
				<Spinner animation='border' />
			</div>
		);
	if (error) {
		toast.error('Error loading transactions...');
		return <p>Error loading transactions...</p>;
	}

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
		<Container fluid className='mb-4'>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>transactions</h4>
				<AddTransactionButton refetch={refetch} />
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
			<div className='table-responsive'>
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
							<th>IsLateReturn</th>
							<th>FineAmount</th>
							<th>FineStatus</th>
							<th>FineIssuedDate</th>
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
									<td>{transaction.bookId ? transaction.bookId.name : ''}</td>
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
									<td>
										<Badge
											bg={
												transaction.isLateReturn === true ? 'danger' : 'success'
											}
										>
											{transaction.isLateReturn ? 'Late' : 'No'}
										</Badge>
									</td>
									<td>{transaction.fineAmount}</td>
									<td>
										<Badge
											bg={
												transaction.fineStatus !== 'paid' ? 'danger' : 'success'
											}
										>
											{transaction.fineStatus}
										</Badge>
									</td>
									<td>
										{transaction.fineIssuedDate
											? formatDate(transaction.fineIssuedDate)
											: ''}
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
		</Container>
	);
};

export default TransactionsList;
