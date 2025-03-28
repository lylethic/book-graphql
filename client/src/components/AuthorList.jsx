import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { Card, Row, Col, CardGroup, Button, Spinner } from 'react-bootstrap';
import AuthorDetails from './AuthorDetails';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import AuthorAddButton from './AuthorAddButton';
import { toast } from 'react-toastify';

const AuthorList = () => {
	const [authorSelected, setAuthorSelected] = useState(null);
	const [authorList, setAuthorList] = useState([]);

	const { loading, error, data, fetchMore } = useQuery(getAuthors, {
		variables: { limit: 10, cursor: null },
	});

	useEffect(() => {
		if (data) {
			setAuthorList((prev) => {
				const newAuthors = data.authors.authors.filter(
					(ng) => !prev.some((pg) => pg.id === ng.id)
				);
				return [...prev, ...newAuthors];
			});
		}
	}, [data]);

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
		setAuthorList((pre) => pre.filter((g) => g.id !== deleteAuthorId));
	};

	if (loading) return <Spinner animation='border' />;
	if (error) {
		toast.error('Error loading authors...');
		return <p>Error loading authors...</p>;
	}

	return (
		<Row className='my-4'>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>authors</h4>
				<AuthorAddButton />
			</div>
			<Col xs={12} md={6} className='mb-3 mb-lg-0'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{authorList.map((author) => (
						<Button
							variant={
								authorSelected === author.id ? 'primary' : 'outline-primary'
							}
							key={author.id}
							border='info'
							text='info'
							className='m-2 shadow text-center pointer'
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
