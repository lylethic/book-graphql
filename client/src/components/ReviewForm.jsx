import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { addSingleReview, updateReview } from "../graphql-client/mutation";
import {
	getBooks,
	getUsers,
	getAllReviewsByBook,
} from "../graphql-client/queries";

const ReviewForm = ({
	isDialogOpen,
	setIsDialogOpen,
	review,
	bookId: initialBookId,
}) => {
	const [reviewData, setReviewData] = useState({
		id: "",
		bookId: initialBookId || "",
		userId: "",
		rating: "",
		comment: "",
	});

	const { loading: loadingBooks, data: booksData } = useQuery(getBooks);
	const { loading: loadingUsers, data: usersData } = useQuery(getUsers);
	useEffect(() => {
		console.log("booksData:", booksData);
		console.log("usersData:", usersData);
	}, [booksData, usersData]);

	// Update form when a review is passed (edit mode)
	useEffect(() => {
		if (review) {
			setReviewData({
				id: review.id,
				bookId: review.bookId?.id || "",
				userId: review.userId?.id || "",
				rating: review.rating || "",
				comment: review.comment || "",
			});
		}
	}, [review]);

	const { id, bookId, userId, rating, comment } = reviewData;

	const onInputChange = (event) => {
		setReviewData({
			...reviewData,
			[event.target.name]: event.target.value,
		});
	};

	// GraphQL operations
	const [addReview] = useMutation(addSingleReview, {
		refetchQueries: [
			{
				query: getAllReviewsByBook,
				variables: { bookId, limit: 5, cursor: null },
			},
		],
		onCompleted: () => {
			alert("Review added successfully!");
			setReviewData({
				bookId: "",
				userId: "",
				rating: "",
				comment: "",
				id: "",
			});
		},
	});

	const [editReview] = useMutation(updateReview);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (review) {
			// Update existing review
			await editReview({
				variables: {
					updateReviewId: review.id,
					bookId,
					userId,
					rating: parseInt(rating),
					comment,
				},
			});
			setIsDialogOpen(false);
		} else {
			await addReview({
				variables: {
					bookId,
					userId,
					rating: parseInt(rating),
					comment,
				},
			});
		}
		setReviewData({
			id: "",
			bookId: "",
			userId: "",
			rating: "",
			comment: "",
		});
	};

	return (
		<Form onSubmit={onSubmit}>
			{review && (
				<Form.Group>
					<Form.Control
						className="mb-2"
						type="text"
						placeholder="Review ID..."
						name="id"
						value={id}
						disabled
					/>
				</Form.Group>
			)}
			<Form.Group>
				<Form.Label>Select Book</Form.Label>
				<Form.Select
					className="mb-2"
					name="bookId"
					value={bookId}
					onChange={onInputChange}>
					<option value="">Choose a book...</option>
					{!loadingBooks &&
						Array.isArray(booksData?.books?.books) &&
						booksData.books.books.map((book) => (
							<option key={book.id} value={book.id}>
								{book.name}
							</option>
						))}
				</Form.Select>
			</Form.Group>

			<Form.Group>
				<Form.Label>Select User</Form.Label>
				<Form.Select
					className="mb-2"
					name="userId"
					value={userId}
					onChange={onInputChange}>
					<option value="">Choose a user...</option>
					{!loadingUsers &&
						Array.isArray(usersData?.users?.users) &&
						usersData.users.users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
				</Form.Select>
			</Form.Group>

			<Form.Group>
				<Form.Control
					className="mb-2"
					type="number"
					placeholder="Rating (1-5)..."
					name="rating"
					value={rating}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					className="mb-2"
					type="text"
					placeholder="Comment..."
					name="comment"
					value={comment}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Button className="float-right" variant="primary" type="submit">
				{review ? "Update Review" : "Add Review"}
			</Button>
		</Form>
	);
};

export default ReviewForm;
