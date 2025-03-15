import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTransaction } from '../../graphql-client/mutation';
import { getAllTransactions } from '../../graphql-client/queries';
import { Button, Form } from 'react-bootstrap';

export default function UpsertTransaction({
	isDialogOpen,
	setIsDialogOpen,
	data,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
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

	// Populate the form when editing (if `data` is provided)
	useEffect(() => {
		if (data) {
			Object.keys(data).forEach((key) => setValue(key, data[key]));
		}
	}, [data, setValue]);

	const onSubmit = async (formData) => {
		try {
			await addNewTransaction({
				variables: {
					userId: formData.userId,
					bookId: formData.bookId,
					borrowDate: formData.borrowDate,
					dueDate: formData.dueDate,
					returnDate: formData.returnDate || null,
					status: formData.status,
				},
			});
			reset();
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
			<Button type='submit' variant='primary'>
				Submit
			</Button>
		</Form>
	);
}
