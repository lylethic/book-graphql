import React, { useState } from 'react';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { getUsers } from '../graphql-client/queries';
import UserDetails from './UserDetails';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import UserAddButton from './UserAddButton';

const UserList = () => {
	const [userSelected, setUserSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getUsers, {
		variables: { limit: 10, cursor: null },
	});

	// Function to load more books
	const loadMore = () => {
		fetchMore({
			variables: { cursor: data.users.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					users: {
						users: [...prevResult.users.users, ...fetchMoreResult.users.users], // Append new users
						nextCursor: fetchMoreResult.users.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handleUserDeleted = (deleteUserId) => {
		if (userSelected === deleteUserId) {
			setUserSelected(null);
		}
		refetch();
	};

	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error Loading users...</p>;

	return (
		<Row>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>users</h4>
				<UserAddButton />
			</div>
			<Col xs={12} md={6} className='mb-3 mb-lg-0'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.users.users.map((user) => (
						<Button
							variant={userSelected !== user.id ? 'outline-primary' : 'primary'}
							key={user.id}
							border='info'
							text='info'
							className='m-2 shadow text-capitalize text-center pointer'
							onClick={setUserSelected.bind(this, user.id)}
						>
							{user.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.users.nextCursor && (
					<Button
						onClick={loadMore}
						className='mt-3'
						style={{
							backgroundColor: '#6861ce',
							borderColor: '#6861ce',
						}}
					>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<UserDetails userId={userSelected} refetchUsers={handleUserDeleted} />
			</Col>
		</Row>
	);
};

export default UserList;
