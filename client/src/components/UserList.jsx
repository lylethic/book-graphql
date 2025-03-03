import React, { useState } from 'react';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { getUsers } from '../graphql-client/queries';
import UserDetails from './UserDetails';

const UserList = () => {
	const [userSelected, setUserSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getUsers, {
		variables: { limit: 5, cursor: null },
	});

	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error Loading users...</p>;

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

	return (
		<Row>
			<Col xs={6}>
				<h4 className='my-2 text-capitalize'>users</h4>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.users.users.map((user) => (
						<Button
							variant='outline-primary'
							key={user.id}
							border='info'
							text='info'
							className='m-2 text-center shadow pointer text-capitalize'
							onClick={setUserSelected.bind(this, user.id)}
						>
							{user.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.users.nextCursor && (
					<Button onClick={loadMore} className='mt-3' variant='secondary'>
						Load More
					</Button>
				)}
			</Col>
			<Col>
				<UserDetails userId={userSelected} refetchUsers={handleUserDeleted} />
			</Col>
		</Row>
	);
};

export default UserList;
