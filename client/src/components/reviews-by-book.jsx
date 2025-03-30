import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
	getCommentsByBookId,
	getSingleReview,
} from '../graphql-client/queries';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { formatVietnamDateTime, renderStars } from '../utils/ultils';
import ReviewDeleteButton from './ReviewDeleteButton';
import UpdateReview from './ReviewUpdate';
import { updateReview } from '../graphql-client/mutation';

const ReviewsByBook = ({ bookId }) => {
	const [selectedReviewId, setSelectedReviewId] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { data, loading, error, fetchMore, refetch } = useQuery(
		getCommentsByBookId,
		{
			variables: { bookId },
			skip: !bookId,
		}
	);

	const { data: reviewData, refetch: reviewRefetch } = useQuery(
		getSingleReview,
		{
			variables: { reviewId: selectedReviewId },
			skip: !selectedReviewId,
		}
	);

	console.log('reviewData:', reviewData);

	if (loading) {
		toast.info('Loading reviews...');
		return <p>Loading reviews...</p>;
	}
	if (error) {
		toast.error('Error loading reviews');
		return <p>Error loading reviews</p>;
	}

	const reviewsData = data?.getCommentsByBookId || {};
	const { comments = [], nextCursor } = reviewsData;

	// Function to load more reviews
	const loadMoreReviews = () => {
		fetchMore({
			variables: { cursor: nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					getCommentsByBookId: {
						comments: [
							...prevResult.getCommentsByBookId.comments,
							...fetchMoreResult.getCommentsByBookId.comments,
						],
						nextCursor: fetchMoreResult.getCommentsByBookId.nextCursor,
					},
				};
			},
		});
	};

	return (
		<div className='my-2'>
			<div className='my-4'>All reviews by this books</div>
			{comments.length > 0 ? (
				comments.map((review) => (
					<Row
						key={review.id}
						className='mb-3 p-3 border rounded shadow-sm bg-light'
					>
						<Col
							md={4}
							lg={4}
							className='d-flex flex-column justify-content-center'
						>
							<strong className='text-capitalize'>
								{review.userId?.name || 'Unknown'}
							</strong>
							<span className='text-muted'>
								{formatVietnamDateTime(review.reviewDate)}
							</span>
						</Col>
						<Col md={6} lg={6} className='d-flex flex-column'>
							<div className='d-flex align-items-center mb-1'>
								<span className='me-2 text-warning'>
									{renderStars(review.rating)}
								</span>
							</div>
							<span className='text-muted'>
								{review.comment || 'No comments'}
							</span>
						</Col>
						<Col
							md={2}
							lg={2}
							className='d-flex align-items-center justify-content-end'
						>
							<ReviewDeleteButton
								reviewId={review.id}
								refetchReviews={refetch}
							/>
							<Button
								variant='warning'
								onClick={() => {
									setSelectedReviewId(review.id);
									setIsOpen(true);
								}}
							>
								Edit
							</Button>
							{isOpen && (
								<UpdateReview
									review={reviewData?.review}
									refetchReviews={reviewRefetch}
									isDialogOpen={isOpen}
									setIsDialogOpen={setIsOpen}
								/>
							)}
						</Col>
					</Row>
				))
			) : (
				<p>No reviews found.</p>
			)}

			{/* Load More Button */}
			{nextCursor && (
				<Button onClick={loadMoreReviews} variant='primary' className='mt-3'>
					Load More Reviews
				</Button>
			)}
		</div>
	);
};

export default ReviewsByBook;
