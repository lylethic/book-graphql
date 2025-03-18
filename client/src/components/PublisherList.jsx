import React, { useState } from "react";
import { Card, Row, Col, CardGroup, Button } from "react-bootstrap";
import PublisherDetails from "./PublisherDetails";
import { useQuery } from "@apollo/client";
import { getAllPublishers } from "../graphql-client/queries";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const PublisherList = () => {
	const [publisherSelected, setPublisherSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(
		getAllPublishers,
		{
			variables: { limit: 5, cursor: null },
		}
	);

	if (loading) return <p>Loading publishers...</p>;
	if (error) return <p>Error Loading publishers...</p>;

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

	return (
		<Row>
			<h4 className="my-2 text-capitalize">Publishers</h4>
			<Col xs={12} md={6} className="mb-lg-0 mb-3">
				<Card className="d-flex flex-row flex-wrap text-left">
					{data.publishers.publishers.map((publisher) => (
						<Button
							variant="outline-primary"
							key={publisher.id}
							border="info"
							text="info"
							className="m-2 text-center shadow pointer text-capitalize"
							onClick={setPublisherSelected.bind(
								this,
								publisher.id
							)}>
							{publisher.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.publishers.nextCursor && (
					<Button
						onClick={loadMorePublishers}
						className="mt-3"
						style={{
							backgroundColor: "#6861ce",
							borderColor: "#6861ce",
						}}>
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
