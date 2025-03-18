import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { getFine } from '../../graphql-client/queries';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { updateFine } from '../../graphql-client/mutation';

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

	const [
		updateFineMutation,
		{ loading: mutationLoading, error: mutationError, data: mutationData },
	] = useMutation(updateFine);

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
	if (queryError)
		return (
			<Alert variant='danger'>Error loading fine: {queryError.message}</Alert>
		);

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className='p-4 border rounded shadow-sm'
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

			<Button variant='primary' type='submit' disabled={mutationLoading}>
				{mutationLoading ? (
					<Spinner animation='border' size='sm' />
				) : (
					'Update Fine'
				)}
			</Button>

			{mutationData && (
				<Alert variant='success' className='mt-3'>
					Fine updated successfully!
				</Alert>
			)}
			{mutationError && (
				<Alert variant='danger' className='mt-3'>
					Error updating fine: {mutationError.message}
				</Alert>
			)}
		</Form>
	);
}
