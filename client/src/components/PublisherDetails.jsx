import React, { Fragment, useState } from "react";
import { useQuery } from "@apollo/client";
import { getSinglePublisher } from "../graphql-client/queries";
import { Card } from "react-bootstrap";
import PublisherDeleteButton from "./PublisherDeleteButton";
import UpdatePublisher from "./PublisherUpdate";

const PublisherDetails = ({ publisherId, refetchPublishers }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data } = useQuery(getSinglePublisher, {
		variables: {
			publisherId,
		},
		skip: !publisherId,
	});

	if (loading) return <p>Loading publisher details...</p>;
	if (error) {
		console.error("GraphQL Error:", error.message);
		return <p>Error Loading publisher details!</p>;
	}

	const publisher = data?.publisher?.data || null;

	return (
		<Card text="black" className="shadow">
			<Card.Body>
				{!publisher ? (
					<Card.Text>Please select a publisher</Card.Text>
				) : (
					<Fragment>
						<Card.Title className="text-capitalize">
							Name: {publisher.name}
						</Card.Title>
						<Card.Text className="text-capitalize">
							Address: {publisher.address}
						</Card.Text>
						<Card.Text className="text-capitalize">
							Contact: {publisher.contact}
						</Card.Text>

						<PublisherDeleteButton
							publisherId={publisherId}
							refetchPublishers={refetchPublishers}
						/>
						<UpdatePublisher
							isDialogOpen={isOpen}
							setIsDialogOpen={setIsOpen}
							publisher={publisher}
							refetchPublishers={refetchPublishers}
						/>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default PublisherDetails;
