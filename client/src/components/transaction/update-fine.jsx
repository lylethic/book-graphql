import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { getFine } from '../../graphql-client/queries';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { updateFine } from '../../graphql-client/mutation';
import { toast } from 'react-toastify';

export default function UpdateFine({ fineId }) {
	const {
		data,
		loading: queryLoading,
		error: queryError,
	} = useQuery(getFine, {
		variables: { fineId },
	});

	const fineData = data?.fine;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Populate form when fineData is available
	React.useEffect(() => {
		if (fineData) {
			setValue('fineId', fineData.id);
			setValue('amount', fineData.amount);
			setValue('transactionId', fineData.transactionId?.id || '');
			setValue('userId', fineData.userId?.id || '');
			setValue('status', fineData.status);
		}
	}, [fineData, setValue]);

	const [updateFineMutation, { loading: mutationLoading }] = useMutation(
		updateFine,
		{
			onCompleted: () => {
				toast.success('Updated successfull!');
			},
			onError: () => {
				toast.error('Failed to update...');
			},
		}
	);

	const onSubmit = async (formData) => {
		try {
			await updateFineMutation({
				variables: {
					fineId: formData.fineId,
					amount: parseFloat(formData.amount),
					transactionId: formData.transactionId,
					userId: formData.userId,
					status: formData.status,
				},
			});
		} catch (err) {
			console.error('Update error:', err);
		}
	};

	if (queryLoading) return <Spinner animation='border' />;
	if (queryError) toast.error('Error loading fine... ');

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className='border p-4 rounded shadow-sm'
		>
			<Form.Group className='mb-3'>
				<Form.Label>Amount</Form.Label>
				<Form.Control
					type='number'
					step='0.01'
					{...register('amount', { required: true })}
				/>
				{errors.amount && (
					<Form.Text className='text-danger'>Amount is required.</Form.Text>
				)}
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Transaction ID</Form.Label>
				<Form.Control
					type='text'
					{...register('transactionId', { required: true })}
				/>
				{errors.transactionId && (
					<Form.Text className='text-danger'>
						Transaction ID is required.
					</Form.Text>
				)}
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>User ID</Form.Label>
				<Form.Control type='text' {...register('userId', { required: true })} />
				{errors.userId && (
					<Form.Text className='text-danger'>User ID is required.</Form.Text>
				)}
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Status</Form.Label>
				<Form.Select {...register('status', { required: true })}>
					<option value='paid'>Paid</option>
					<option value='unpaid'>Unpaid</option>
				</Form.Select>
				{errors.status && (
					<Form.Text className='text-danger'>Status is required.</Form.Text>
				)}
			</Form.Group>

			<Button
				className='d-flex align-items-center justify-content-center w-100 mt-4'
				variant='primary'
				type='submit'
				disabled={mutationLoading}
			>
				{mutationLoading ? <Spinner animation='border' size='sm' /> : 'Update'}
			</Button>
		</Form>
	);
}
