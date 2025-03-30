import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Button, Spinner } from 'react-bootstrap';
import { addSingleReview, updateReview } from '../graphql-client/mutation';
import {
	getBooks,
	getUsers,
	getAllReviewsByBook,
} from '../graphql-client/queries';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ReviewForm = ({ isDialogOpen, setIsDialogOpen, review, bookIdProp }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			bookId: '',
			userId: '',
			rating: '',
			comment: '',
		},
	});

	const { loading: loadingBooks, data: booksData } = useQuery(getBooks);
	const { loading: loadingUsers, data: usersData } = useQuery(getUsers);

	useEffect(() => {
		if (review) {
			reset({
				id: review.id,
				bookId: review.bookId?.id || '',
				userId: review.userId?.id || '',
				rating: review.rating || '',
				comment: review.comment || '',
			});
		} else {
			reset({
				id: '',
				bookId: '',
				userId: '',
				rating: '',
				comment: '',
			});
		}
	}, [review, reset]);

	// GraphQL operations
	const [addReview, { loading }] = useMutation(addSingleReview, {
		refetchQueries: [
			{
				query: getAllReviewsByBook,
				variables: { bookId: bookIdProp, limit: 5, cursor: null },
			},
		],
		onCompleted: () => {
			toast.success('Review added successfully!');
			reset();
		},
	});

	const [editReview] = useMutation(updateReview, {
		onCompleted: () => {
			toast.success('Review updated successfully!');
			setIsDialogOpen(false);
		},
		onError: (error) => {
			toast.error('Failed to update review: ' + error.message);
		},
	});

	const onSubmit = async (data) => {
		try {
			if (review) {
				// Update existing review
				await editReview({
					variables: {
						id: data.id,
						bookId: data.bookId?.id || data.bookId,
						userId: data.userId?.id || data.userId,
						rating: data.rating ? parseInt(data.rating) : data.rating,
						comment: data.comment,
					},
				});
				setIsDialogOpen(false);
			} else {
				await addReview({
					variables: {
						bookId: data.bookId,
						userId: data.userId,
						rating: data.rating ? parseInt(data.rating) : data.rating,
						comment: data.comment,
					},
				});
			}
		} catch (error) {
			toast.error('Error processing form: ' + error.message);
		}
	};

	return (
		<>
			{loading ? (
				<Spinner className='my-2' />
			) : (
				<Form onSubmit={handleSubmit(onSubmit)}>
					{review && (
						<Form.Group>
							<Form.Label>Review ID</Form.Label>
							<Controller
								name='id'
								control={control}
								render={({ field }) => (
									<Form.Control
										className='mb-2'
										type='text'
										placeholder='Review ID...'
										{...field}
										disabled
									/>
								)}
							/>
						</Form.Group>
					)}
					<Form.Group>
						<Form.Label>Select Book</Form.Label>
						<Controller
							name='bookId'
							control={control}
							rules={{ required: 'Please select a book.' }}
							render={({ field }) => (
								<Form.Select
									className='mb-2'
									aria-label='Please select a book'
									{...field}
									isInvalid={!!errors.bookId}
								>
									<option value=''>Choose a book...</option>
									{!loadingBooks &&
										Array.isArray(booksData?.books?.books) &&
										booksData.books.books.map((book) => (
											<option key={book.id} value={book.id}>
												{book.name}
											</option>
										))}
								</Form.Select>
							)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Select User</Form.Label>
						<Controller
							name='userId'
							control={control}
							rules={{ required: 'Please select a user.' }}
							render={({ field }) => (
								<Form.Select
									className='mb-2'
									aria-label='Please select a user'
									{...field}
									isInvalid={!!errors.userId}
								>
									<option value=''>Choose a user...</option>
									{!loadingUsers &&
										Array.isArray(usersData?.users?.users) &&
										usersData.users.users.map((user) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
										))}
								</Form.Select>
							)}
						/>
					</Form.Group>

					<Form.Group>
						<Controller
							name='rating'
							control={control}
							rules={{ required: 'Please provide a rating.' }}
							render={({ field }) => (
								<Form.Control
									className='mb-2'
									type='number'
									placeholder='Rating (1-5)...'
									{...field}
									min='1'
									max='5'
									isInvalid={!!errors.rating}
								/>
							)}
						/>
					</Form.Group>
					<Form.Group>
						<Controller
							name='comment'
							control={control}
							rules={{ required: 'Please provide a comment.' }}
							render={({ field }) => (
								<Form.Control
									as={'textarea'}
									rows={4}
									className='mb-2'
									type='text'
									placeholder='Comment...'
									{...field}
									isInvalid={!!errors.comment}
								/>
							)}
						/>
					</Form.Group>

					<Button
						className='d-flex w-100 align-items-center justify-content-center my-3'
						variant='primary'
						type='submit'
					>
						{review ? 'Update Review' : 'Add Review'}
					</Button>
				</Form>
			)}
		</>
	);
};

export default ReviewForm;
