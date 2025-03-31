import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleUser } from '../graphql-client/queries';
import UserDeleteButton from './UserDeleteButton';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import UpdateUserButton from './UpdateUserButton';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDetails = ({ refetchUsers }) => {
	const { id: userId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data, refetch } = useQuery(getSingleUser, {
		variables: userId ? { id: userId } : {},
		skip: !userId,
	});

	if (loading) {
		toast.info('Loading user details...');
		return <p>Loading user details...</p>;
	}
	if (error) {
		toast.error('Error loading user deatils...');
		console.log(error.message);
		return <p>Error loading user details!</p>;
	}

	const user = userId !== null ? data.user : null;
	if (!user) return <p>No user found!</p>;

	return (
		<Container>
			<Row className='my-4'>
				<Col md={4} sm={12}>
					{user.image ? (
						<Image
							src={user.image}
							alt={user.name}
							fluid
							rounded
							className='mb-3 shadow'
							style={{ maxHeight: '400px', objectFit: 'cover' }}
						/>
					) : (
						<div
							className='bg-light d-flex align-items-center justify-content-center mb-3 shadow'
							style={{ height: '400px', borderRadius: '8px' }}
						>
							<span className='text-muted'>No image available</span>
						</div>
					)}
				</Col>
				<Col md={8} sm={12}>
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
									<Card.Text className='text-capitalize'>
										Role: {user.role}
									</Card.Text>

									{/* <UserDeleteButton
										userId={userId}
										refetchUsers={refetchUsers}
									/> */}
									<UpdateUserButton
										isDialogOpen={isOpen}
										setIsDialogOpen={setIsOpen}
										user={user}
										refetchUsers={refetch}
									/>
								</Fragment>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default UserDetails;
