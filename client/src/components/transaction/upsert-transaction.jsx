import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	createTransaction,
	updateTransaction,
} from '../../graphql-client/mutation';
import { getAllTransactions } from '../../graphql-client/queries';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function UpsertTransaction({
	isDialogOpen,
	setIsDialogOpen,
	transaction,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			userId: '',
			bookId: '',
			dueDate: '',
			borrowDate: '',
			returnDate: '',
			status: '',
		},
		criteriaMode: 'all',
	});

	const [addNewTransaction] = useMutation(createTransaction, {
		onCompleted: () => {
			alert('Add new Transaction successfull!');
		},
		refetchQueries: [{ query: getAllTransactions }],
	});

	const [editTransaction] = useMutation(updateTransaction, {
		onCompleted: () => {
			toast.success('Updated successfull!');
		},
		onError: () => {
			toast.error('Can not update transaction...');
		},
	});

	useEffect(() => {
		if (transaction) {
			// Handle regular fields
			Object.keys(transaction).forEach((key) => {
				// Handle nested userId and bookId as objects
				if (key === 'userId' && transaction.userId?.id) {
					setValue('userId', transaction.userId.id);
				} else if (key === 'bookId' && transaction.bookId?.id) {
					setValue('bookId', transaction.bookId.id);
				}
				// Handle date fields (convert from timestamp if necessary)
				else if (
					['borrowDate', 'dueDate', 'returnDate'].includes(key) &&
					transaction[key]
				) {
					const date = new Date(parseInt(transaction[key]))
						.toISOString()
						.split('T')[0];
					setValue(key, date); // Set in 'YYYY-MM-DD' format
				}
				// Handle other fields
				else if (
					!['userId', 'bookId', 'borrowDate', 'dueDate', 'returnDate'].includes(
						key
					)
				) {
					setValue(key, transaction[key]);
				}
			});
		}
	}, [transaction, setValue]);

	const onSubmit = async (formData) => {
		try {
			if (transaction) {
				await editTransaction({
					variables: {
						id: formData.id,
						userId: formData.userId,
						bookId: formData.bookId,
						borrowDate: formData.borrowDate,
						dueDate: formData.dueDate,
						returnDate: formData.returnDate || null,
						status: formData.status,
					},
				});
			} else {
				await addNewTransaction({
					variables: {
						id: formData.id || null,
						userId: formData.userId,
						bookId: formData.bookId,
						borrowDate: formData.borrowDate,
						dueDate: formData.dueDate,
						returnDate: formData.returnDate || null,
						status: formData.status,
					},
				});
				reset();
			}
		} catch (err) {
			console.error('Error submitting transaction:', err);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className='mb-3'>
				<Form.Label>User ID</Form.Label>
				<Form.Control
					type='text'
					{...register('userId', { required: 'User ID is required' })}
					isInvalid={!!errors.userId}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.userId?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Book ID</Form.Label>
				<Form.Control
					type='text'
					{...register('bookId', { required: 'Book ID is required' })}
					isInvalid={!!errors.bookId}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.bookId?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Borrow Date</Form.Label>
				<Form.Control
					type='date'
					{...register('borrowDate', { required: 'Borrow Date is required' })}
					isInvalid={!!errors.borrowDate}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.borrowDate?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Due Date</Form.Label>
				<Form.Control
					type='date'
					{...register('dueDate', { required: 'Due Date is required' })}
					isInvalid={!!errors.dueDate}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.dueDate?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Return Date</Form.Label>
				<Form.Control type='date' {...register('returnDate')} />
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Status</Form.Label>
				<Form.Select
					{...register('status', { required: 'Status is required' })}
					isInvalid={!!errors.status}
				>
					<option value=''>Select status</option>
					<option value='borrowed'>Borrowed</option>
					<option value='returned'>Returned</option>
					<option value='overdue'>Overdue</option>
				</Form.Select>
				<Form.Control.Feedback type='invalid'>
					{errors.status?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Button
				className='d-flex align-items-center justify-content-center w-100 mt-4'
				type='submit'
				variant='primary'
			>
				{transaction ? 'Update' : 'Add'}
			</Button>
		</Form>
	);
}
