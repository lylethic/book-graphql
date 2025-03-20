import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Table, Badge, Modal, Button } from 'react-bootstrap';
import { getAllFines } from '../../graphql-client/queries';
import UpdateFine from './update-fine';
import DeleteFineButton from './delete-fine';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const FineList = () => {
	const [selectedFineId, setSelectedFineId] = useState(null);
	const handleClose = () => setSelectedFineId(null);

	const { data, loading, error, refetch, fetchMore } = useQuery(getAllFines, {
		variables: { limit: 10, cursor: null },
	});

	const fines = data?.fines?.fines || [];
	if (loading) return <p>Loading fines...</p>;
	if (error) return <p>Error loading fines...</p>;

	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp));
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	const loadMoreGenres = () => {
		fetchMore({
			variables: { cursor: data.fines.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				const combinedGenres = [
					...prevResult.fines.fines,
					...fetchMoreResult.fines.fines,
				];

				return {
					fines: {
						fines: combinedGenres,
						nextCursor: fetchMoreResult.fines.nextCursor,
					},
				};
			},
		});
	};

	return (
		<div className='my-4'>
			<h5 className='mb-3'>Fines List</h5>
			<Table striped bordered hover responsive className='shadow'>
				<thead>
					<tr>
						<th>#</th>
						<th>Book</th>
						<th>Author</th>
						<th>Genre</th>
						<th>User</th>
						<th>Date Issued</th>
						<th>Amount</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{fines.map((fine, index) => (
						<tr key={fine.id}>
							<td>{index + 1}</td>
							<td className='text-capitalize'>
								{fine.transactionId.bookId.name}
							</td>
							<td className='text-capitalize'>
								{fine.transactionId.bookId.author.name}
							</td>
							<td className='text-capitalize'>
								{fine.transactionId.bookId.genre.name}
							</td>
							<td className='text-capitalize'>{fine.userId.name}</td>
							<td>{formatDate(fine.issuedDate)}</td>
							<td>${fine.amount}</td>
							<td>
								<Badge bg={fine.status === 'paid' ? 'success' : 'warning'} pill>
									{fine.status.toUpperCase()}
								</Badge>
							</td>
							<td className='d-flex gap-2'>
								<Button
									variant='primary'
									size='sm'
									onClick={() => setSelectedFineId(fine.id)}
								>
									Edit
								</Button>
								<DeleteFineButton fineId={fine.id} refetchData={refetch} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{data?.fines?.nextCursor && (
				<Button
					onClick={loadMoreGenres}
					className='mt-3'
					style={{
						backgroundColor: '#6861ce',
						borderColor: '#6861ce',
					}}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}

			<Modal
				show={!!selectedFineId}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Fine</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedFineId && (
						<UpdateFine fineId={selectedFineId} onUpdate={refetch} />
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default FineList;
