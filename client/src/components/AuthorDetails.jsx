import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleAuthor } from '../graphql-client/queries';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import AuthorDeleteButton from './AuthorDeleteButton';
import UpdateAuthor from './UpdateAuthor';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthorDetails = ({ refetchAuthors }) => {
	const { id: authorId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data } = useQuery(getSingleAuthor, {
		variables: authorId ? { id: authorId } : {},
		skip: !authorId,
	});

	if (loading) {
		toast.info('Loading author details...');
		return <p>Loading author details...</p>;
	}
	if (error) {
		toast.error('Error loading author details...');
		console.log(error.message);
		return <p>Error Loading author details!</p>;
	}

	const author = data ? data.author : null;
	if (!author) return <p className='text-center'>No author found!</p>;

	return (
		<Container>
			<Row lassName='my-4'>
				<Col md={4} sm={12}>
					{author.image ? (
						<Image
							src={author.image}
							alt={author.name}
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
							{author === null ? (
								<Card.Text>Please select a author</Card.Text>
							) : (
								<Fragment>
									<Card.Title>Author details</Card.Title>
									<Card.Text>Full name: {author.name}</Card.Text>
									<Card.Text>Age: {author.age}</Card.Text>

									<div className='mt-4 d-flex gap-2'>
										<UpdateAuthor
											isDialogOpen={isOpen}
											setIsDialogOpen={setIsOpen}
											author={author}
											refetchAuthors={refetchAuthors}
										/>
									</div>
								</Fragment>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default AuthorDetails;
