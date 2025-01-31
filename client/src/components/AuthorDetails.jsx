import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleAuthor } from '../graphql-client/queries';
import { Card } from 'react-bootstrap';
import AuthorDeleteButton from './AuthorDeleteButton';

const AuthorDetails = ({ authorId, refetchAuthors }) => {
	const { loading, error, data } = useQuery(getSingleAuthor, {
		variables: {
			id: authorId,
		},
		skip: authorId === null,
	});

	if (loading) return <p>Loading author details...</p>;
	if (error) {
		console.log(error.message);
		return <p>Error Loading author details!</p>;
	}

	const author = authorId !== null ? data.author : null;

	return (
		<Card bg='info' text='white' className='shadow'>
			<Card.Body>
				{author === null ? (
					<Card.Text>Please select a author</Card.Text>
				) : (
					<Fragment>
						<Card.Title>Author details: </Card.Title>
						<Card.Text>Full name: {author.name}</Card.Text>
						<Card.Text>Age: {author.age}</Card.Text>
						<AuthorDeleteButton
							authorId={authorId}
							refetchAuthors={refetchAuthors}
						/>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default AuthorDetails;
