import React, { useState } from 'react';
import { Table, Button, Spinner, Container, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { getUsers } from '../graphql-client/queries';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import noImage from '../assets/no-image-available/no-img.png';
import UserAddButton from './UserAddButton';
import UserDeleteButton from './UserDeleteButton';

const UserList = () => {
	const [userSelected, setUserSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getUsers, {
		variables: { limit: 10, cursor: null },
	});

	// Function to load more users
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

	if (loading) return <Spinner animation='border' />;
	if (error) {
		toast.error('Error loading users...');
		return <p>Error loading users...</p>;
	}

	return (
		<Container className='mt-4'>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>Users</h4>
				<UserAddButton />
			</div>

			{/* User Table */}
			<Table striped bordered hover responsive>
				<thead className='bg-primary text-white'>
					<tr>
						<th>#</th>
						<th>ID</th>
						<th>Avatar</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.users.users.map((user, index) => (
						<tr
							key={user.id}
							className={userSelected === user.id ? 'table-primary' : ''}
						>
							<td>{index + 1}</td>
							<td>{user.id}</td>
							<td className='text-center'>
								<Image
									src={user.image || noImage}
									width={100}
									height={100}
									alt={user.name}
								/>
							</td>
							<td>
								<Link
									to={`/users/${user.id}`}
									className='text-decoration-none text-capitalize'
								>
									{user.name}
								</Link>
							</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td className='text-center'>
								<UserDeleteButton
									userId={user.id}
									refetchUsers={handleUserDeleted}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Load More Button */}
			{data.users.nextCursor && (
				<Button
					onClick={loadMore}
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}
		</Container>
	);
};

export default UserList;
