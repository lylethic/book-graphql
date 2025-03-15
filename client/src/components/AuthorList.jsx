import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import AuthorDetails from './AuthorDetails';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const AuthorList = () => {
	const [authorSelected, setAuthorSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getAuthors, {
		variables: { limit: 5, cursor: null },
	});

	if (loading) return <p>Loading authors...</p>;
	if (error) return <p>Error Loading authors...</p>;

	// Function to load more authors
	const loadMoreAuthors = () => {
		fetchMore({
			variables: { cursor: data.authors.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					authors: {
						authors: [
							...prevResult.authors.authors,
							...fetchMoreResult.authors.authors,
						],
						nextCursor: fetchMoreResult.authors.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handleAuthorDeleted = (deleteAuthorId) => {
		if (authorSelected === deleteAuthorId) {
			setAuthorSelected(null);
		}
		refetch();
	};

	return (
		<Row className='my-4'>
			<h4 className='my-2 text-capitalize'>authors</h4>
			<Col xs={12} md={6} className='mb-lg-0 mb-3'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.authors.authors.map((author) => (
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
				{/* Pagination Button */}
				{data.authors.nextCursor && (
					<Button
						className='mt-3'
						style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
						onClick={loadMoreAuthors}
					>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<AuthorDetails
					authorId={authorSelected}
					refetchAuthors={handleAuthorDeleted}
				/>
			</Col>
		</Row>
	);
};

export default AuthorList;
