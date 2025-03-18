import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { addSingleFine } from '../../graphql-client/mutation';
import { getAllFines } from '../../graphql-client/queries';

export default function FineAddForm({ transactionId, userId }) {
	const {
		register,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			amount: '',
			status: '',
		},
	});

	// Set transactionId and userId into form on mount
	useEffect(() => {
		setValue('transactionId', transactionId);
		setValue('userId', userId);
	}, [transactionId, userId, setValue]);

	const [addFine] = useMutation(addSingleFine, {
		onCompleted: () => {
			alert('Successfully created fine!');
		},
		refetchQueries: [{ query: getAllFines }],
	});

	const onSubmit = async (formData) => {
		try {
			await addFine({
				variables: {
					transactionId: formData.transactionId,
					userId: formData.userId,
					amount: parseFloat(formData.amount), // Ensure number
					status: formData.status,
				},
			});
			reset();
		} catch (error) {
			console.error('Error creating fine:', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{/* Hidden fields for userId and transactionId */}
			<Form.Control
				type='hidden'
				{...register('userId', { required: 'User ID is required' })}
			/>
			<Form.Control
				type='hidden'
				{...register('transactionId', {
					required: 'Transaction ID is required',
				})}
			/>

			<Form.Group className='mb-3'>
				<Form.Label>Fine amount</Form.Label>
				<Form.Control
					type='number'
					step='0.01'
					{...register('amount', { required: 'Amount is required' })}
					isInvalid={!!errors.amount}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.amount?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Status</Form.Label>
				<Form.Select
					{...register('status', { required: 'Status is required' })}
					isInvalid={!!errors.status}
				>
					<option value=''>Select status</option>
					<option value='paid'>Paid</option>
					<option value='unpaid'>Unpaid</option>
				</Form.Select>
				<Form.Control.Feedback type='invalid'>
					{errors.status?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Button type='submit' variant='primary'>
				Create Fine
			</Button>
		</Form>
	);
}
