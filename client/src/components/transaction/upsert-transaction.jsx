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
			status: '',
			isLateReturn: false,
			fineAmount: 0,
			fineStatus: '',
			fineIssuedDate: '',
		},
		criteriaMode: 'all',
	});

	const [addNewTransaction] = useMutation(createTransaction, {
		onCompleted: () => {
			toast.success('Add new Transaction successfull!');
		},
		onError: () => {
			toast.error('Can not add transaction...');
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
			Object.keys(transaction).forEach((key) => {
				if (key === 'userId' && transaction.userId?.id) {
					setValue('userId', transaction.userId.id);
				} else if (key === 'bookId' && transaction.bookId?.id) {
					setValue('bookId', transaction.bookId.id);
				} else if (
					['borrowDate', 'dueDate', 'returnDate', 'fineIssuedDate'].includes(
						key
					) &&
					transaction[key]
				) {
					const date = new Date(parseInt(transaction[key]))
						.toISOString()
						.split('T')[0];
					setValue(key, date);
				} else {
					setValue(key, transaction[key]);
				}
			});
		}
	}, [transaction, setValue]);

	const onSubmit = async (formData) => {
		try {
			const payload = {
				id: formData.id,
				userId: formData.userId,
				bookId: formData.bookId,
				borrowDate: formData.borrowDate,
				dueDate: formData.dueDate,
				returnDate: formData.returnDate || null,
				status: formData.status,
				isLateReturn: formData.isLateReturn,
				fineAmount: parseFloat(formData.fineAmount),
				fineStatus: formData.fineStatus,
				fineIssuedDate: formData.fineIssuedDate || null,
			};

			if (transaction) {
				await editTransaction({ variables: payload });
			} else {
				await addNewTransaction({ variables: payload });
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

			<Form.Group className='mb-3'>
				<Form.Label>Is Late Return</Form.Label>
				<Form.Select {...register('isLateReturn')}>
					<option value='false'>No</option>
					<option value='true'>Yes</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Fine Amount</Form.Label>
				<Form.Control type='number' step='0.01' {...register('fineAmount')} />
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Fine Status</Form.Label>
				<Form.Select {...register('fineStatus')}>
					<option value=''>Select fine status</option>
					<option value='unpaid'>Unpaid</option>
					<option value='paid'>Paid</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Fine Issued Date</Form.Label>
				<Form.Control type='date' {...register('fineIssuedDate')} />
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
