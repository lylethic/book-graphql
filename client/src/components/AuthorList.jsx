import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import AuthorDetails from './AuthorDetails';

const AuthorList = () => {
	const [authorSelected, setAuthorSelected] = useState(null);
	const { loading, error, data, refetch } = useQuery(getAuthors);
	console.log(data);

	if (loading) return <p>Loading authors...</p>;
	if (error) return <p>Error Loading authors...</p>;

	const handleAuthorDeleted = (deleteAuthorId) => {
		if (authorSelected === deleteAuthorId) {
			setAuthorSelected(null);
		}
		refetch();
	};

	return (
		<Row className='my-4'>
			<h4 className='my-2 text-capitalize'>authors</h4>
			<Col xs={6}>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.authors.map((author) => (
						<Button
							variant='outline-primary'
							key={author.id}
							border='info'
							text='info'
							className='m-2 text-center shadow pointer'
							onClick={setAuthorSelected.bind(this, author.id)}
						>
							{author.name}
						</Button>
					))}
				</Card>
			</Col>
			<Col>
				<AuthorDetails
					authorId={authorSelected}
					refetchAuthors={handleAuthorDeleted}
				/>
			</Col>
		</Row>
	);
};

export default AuthorList;
