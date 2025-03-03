import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleAuthor } from '../graphql-client/queries';
import { Card } from 'react-bootstrap';
import AuthorDeleteButton from './AuthorDeleteButton';
import UpdateAuthor from './UpdateAuthor';

const AuthorDetails = ({ authorId, refetchAuthors }) => {
	const [isOpen, setIsOpen] = useState(false);
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
		<Card text='black' className='shadow'>
			<Card.Body>
				{author === null ? (
					<Card.Text>Please select a author</Card.Text>
				) : (
					<Fragment>
						<Card.Title>Author details</Card.Title>
						<Card.Text>Full name: {author.name}</Card.Text>
						<Card.Text>Age: {author.age}</Card.Text>
						<AuthorDeleteButton
							authorId={authorId}
							refetchAuthors={refetchAuthors}
						/>
						<UpdateAuthor
							isDialogOpen={isOpen}
							setIsDialogOpen={setIsOpen}
							author={author}
							refetchAuthors={refetchAuthors}
						/>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default AuthorDetails;
