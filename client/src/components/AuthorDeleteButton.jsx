import { useMutation } from '@apollo/client';
import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteAuthor } from '../graphql-client/mutation';

export default function AuthorDeleteButton({ authorId, refetchAuthors }) {
	const [removeBook] = useMutation(deleteAuthor, {
		onCompleted: () => {
			refetchAuthors(authorId);
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: authorId } });
			console.log('Author deleted successfully');
		} catch (err) {
			console.error('Error deleting author:', err.message);
		}
	};

	return (
		<Button className='me-3' variant='danger' onClick={handleDelete}>
			Delete
		</Button>
	);
}
