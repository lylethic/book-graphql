import React, { useState } from 'react';
import { Card, Row, Col, CardGroup, Button } from 'react-bootstrap';
import PublisherDetails from './PublisherDetails';
import { useQuery } from '@apollo/client';
import { getAllPublishers } from '../graphql-client/queries';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import PublisherAddButton from './PublisherAddButton';

const PublisherList = () => {
	const [publisherSelected, setPublisherSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(
		getAllPublishers,
		{
			variables: { limit: 10, cursor: null },
		}
	);

	// Function to load more books
	const loadMorePublishers = () => {
		fetchMore({
			variables: { cursor: data.publishers.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					publishers: {
						publishers: [
							...prevResult.publishers.publishers,
							...fetchMoreResult.publishers.publishers,
						], // Append new publishers
						nextCursor: fetchMoreResult.publishers.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handlePublisherDeleted = (deletedPublisherId) => {
		if (publisherSelected === deletedPublisherId) {
			setPublisherSelected(null);
		}
		refetch();
	};

	if (loading) return <p>Loading publishers...</p>;
	if (error) return <p>Error Loading publishers...</p>;

	return (
		<Row>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>Publishers</h4>
				<PublisherAddButton />
			</div>
			<Col xs={12} md={6} className='mb-3 mb-lg-0'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{data.publishers.publishers.map((publisher) => (
						<Button
							variant={
								publisherSelected !== publisher.id
									? 'outline-primary'
									: 'primary'
							}
							key={publisher.id}
							border='info'
							text='info'
							className='m-2 shadow text-capitalize text-center pointer'
							onClick={setPublisherSelected.bind(this, publisher.id)}
						>
							{publisher.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.publishers.nextCursor && (
					<Button
						onClick={loadMorePublishers}
						className='mt-3'
						style={{
							backgroundColor: '#6861ce',
							borderColor: '#6861ce',
						}}
					>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<PublisherDetails
					publisherId={publisherSelected}
					refetchPublishers={handlePublisherDeleted}
				/>
			</Col>
		</Row>
	);
};

export default PublisherList;
