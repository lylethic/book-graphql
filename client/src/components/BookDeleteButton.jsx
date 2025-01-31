import { useMutation } from '@apollo/client';
import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteBook } from '../graphql-client/mutation';

export default function BookDeleteButton({ bookId, refetchBooks }) {
	const [removeBook] = useMutation(deleteBook, {
		onCompleted: () => {
			refetchBooks(bookId);
		},
	});

	const handleDelete = async () => {
		try {
			await removeBook({ variables: { id: bookId } });
			console.log('Book deleted successfully');
		} catch (err) {
			console.error('Error deleting book:', err.message);
		}
	};

	return (
		<Button variant='danger' onClick={handleDelete}>
			Delete
		</Button>
	);
}
