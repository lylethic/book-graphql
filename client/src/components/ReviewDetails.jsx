import React, { Fragment, useState } from "react";
import { useQuery } from "@apollo/client";
import { getSingleReview } from "../graphql-client/queries";
import { Card } from "react-bootstrap";
import ReviewDeleteButton from "./ReviewDeleteButton";
import UpdateReview from "./ReviewUpdate";

const ReviewDetails = ({ reviewId, refetchReviews }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { loading, error, data } = useQuery(getSingleReview, {
		variables: {
			reviewId,
		},
		skip: !reviewId,
	});

    console.log("Selected Review ID:", reviewId);
    console.log("Review data received:", data);


	if (loading) return <p>Loading review details...</p>;
	if (error) {
		console.error("GraphQL Error:", error.message);
		return <p>Error Loading review details!</p>;
	}

	const review = data?.review || null;

	return (
		<Card text="black" className="shadow">
			<Card.Body>
				{!review ? (
					<Card.Text>Please select a review</Card.Text>
				) : (
					<Fragment>
						<Card.Title className="text-capitalize">
							User: {review.userId?.name || "Unknown"}
						</Card.Title>
						<Card.Text className="text-capitalize">
							Book Name: {review.bookId?.name || "Unknown"}
						</Card.Text>
						<Card.Text className="text-capitalize">
							Rating: {review.rating} ⭐
						</Card.Text>
						<Card.Text>
							Comment: {review.comment || "No comments"}
						</Card.Text>

						<ReviewDeleteButton
							reviewId={review.id}
							refetchReviews={refetchReviews}
						/>
						<UpdateReview
							isDialogOpen={isOpen}
							setIsDialogOpen={setIsOpen}
							review={review}
							refetchReviews={refetchReviews}
						/>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
};

export default ReviewDetails;
