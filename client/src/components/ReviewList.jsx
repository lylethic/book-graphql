import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ReviewDetails from "./ReviewDetails";
import { useQuery } from "@apollo/client";
import { getAllReviewsByBook } from "../graphql-client/queries";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ReviewList = ({ bookId }) => {
	const [reviewSelected, setReviewSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(
		getAllReviewsByBook,
		{
			variables: { bookId, limit: 5, cursor: null },
		}
	);

	useEffect(() => {
		setReviewSelected(null);
	}, [bookId]);

	if (loading) return <p>Loading reviews...</p>;
	if (error) return <p>Error loading reviews...</p>;
	if (!loading && data?.getCommentsByBookId?.comments.length === 0) {
		return <p className="text-muted">Không có review nào</p>;
	}

	// Function to load more reviews
	const loadMoreReviews = () => {
		if (!data?.getCommentsByBookId?.nextCursor) return;

		fetchMore({
			variables: {
				cursor: data.getCommentsByBookId.nextCursor,
				limit: 5,
			},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult?.getCommentsByBookId) return prevResult;

				console.log(
					"Previous reviews:",
					prevResult.getCommentsByBookId.comments
				);
				console.log(
					"Fetched new reviews:",
					fetchMoreResult.getCommentsByBookId.comments
				);

				// Nếu không có review mới => Không cập nhật gì cả
				if (fetchMoreResult.getCommentsByBookId.comments.length === 0) {
					return prevResult;
				}

				const mergedComments = [
					...prevResult.getCommentsByBookId.comments,
					...fetchMoreResult.getCommentsByBookId.comments,
				];

				// Loại bỏ các review trùng ID
				const uniqueComments = mergedComments.filter(
					(comment, index, self) =>
						index === self.findIndex((c) => c.id === comment.id)
				);

				return {
					getCommentsByBookId: {
						...prevResult.getCommentsByBookId,
						comments: uniqueComments,
						nextCursor:
							fetchMoreResult.getCommentsByBookId.nextCursor ??
							null,
					},
				};
			},
		});
	};

	const handleReviewDeleted = (deletedReviewId) => {
		if (reviewSelected === deletedReviewId) {
			setReviewSelected(null);
		}
		refetch();
	};

	return (
		<Row>
			<h4 className="my-2 text-capitalize">Reviews</h4>
			<Col xs={12} md={6} className="mb-lg-0 mb-3">
				<Card className="d-flex flex-row flex-wrap text-left">
					{data.getCommentsByBookId.comments.map((review) => (
						<Button
							variant="outline-primary"
							key={review.id}
							className="m-2 text-center shadow pointer text-capitalize"
							onClick={setReviewSelected.bind(this, review.id)}>
							Review by {review.userId.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.getCommentsByBookId.nextCursor && (
					<Button onClick={loadMoreReviews} className="mt-3">
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<ReviewDetails
					reviewId={reviewSelected}
					refetchReviews={handleReviewDeleted}
				/>
			</Col>
		</Row>
	);
};

export default ReviewList;
