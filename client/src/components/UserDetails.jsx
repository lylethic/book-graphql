import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleUser } from '../graphql-client/queries';
import UserDeleteButton from './UserDeleteButton';
import { Card } from 'react-bootstrap';
import UpdateUserButton from './UpdateUserButton';

const UserDetails = ({ userId, refetchUsers }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data } = useQuery(getSingleUser, {
		variables: {
			id: userId,
		},
		skip: userId === null,
	});

	if (loading) return <p>Loading user details...</p>;
	if (error) {
		console.log(error.message);
		return <p>Error Loading user details!</p>;
	}

	const user = userId !== null ? data.user : null;

	return (
		<Card text='black' className='shadow'>
			<Card.Body>
				{user === null ? (
					<Card.Text>Please select a user</Card.Text>
				) : (
					<Fragment>
						<Card.Title className='text-capitalize'>
							Fullname: {user.name}
						</Card.Title>
						<Card.Text>Email: {user.email}</Card.Text>
						<Card.Text className='text-capitalize'>Role: {user.role}</Card.Text>

						<UserDeleteButton userId={userId} refetchUsers={refetchUsers} />
						<UpdateUserButton
							isDialogOpen={isOpen}
							setIsDialogOpen={setIsOpen}
							user={user}
							refetchUsers={refetchUsers}
						/>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default UserDetails;
