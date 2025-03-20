import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { getGenres } from '../../graphql-client/queries';
import { Button, Form } from 'react-bootstrap';
import { addGenre, updateGenre } from '../../graphql-client/mutation';
import { toast } from 'react-toastify';

export default function GenreUpsertForm({ genre }) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			name: '',
			description: '',
		},
		criteriaMode: 'all',
	});

	const [addNewGenre] = useMutation(addGenre, {
		onCompleted: () => {
			toast.success('Add new genre successfull!');
		},
		onError: () => {
			toast.error('Failed to add genre...');
		},
		refetchQueries: [{ query: getGenres }],
	});

	const [updateGenreDetail] = useMutation(updateGenre, {
		onCompleted: () => {
			toast.success('Updated successfull!');
		},
		onError: () => {
			toast.error('Can not update genre...');
		},
	});

	useEffect(() => {
		if (genre) {
			Object.keys(genre).forEach((key) => setValue(key, genre[key]));
		}
	}, [genre, setValue]);

	const onSubmit = async (formData) => {
		try {
			if (!genre) {
				await addNewGenre({
					variables: {
						id: formData.id || null,
						name: formData.name,
						description: formData.description,
					},
				});
				reset();
			} else
				await updateGenreDetail({
					variables: {
						id: formData.id,
						name: formData.name,
						description: formData.description,
					},
				});
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='p-2'>
			<Form.Group className='mb-3'>
				<Form.Label>Genre ID</Form.Label>
				<Form.Control type='text' name='id' {...register('id')} disabled />
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Name</Form.Label>
				<Form.Control
					type='text'
					{...register('name', { required: 'Name ID is required' })}
					isInvalid={!!errors.name}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.name?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Description</Form.Label>
				<Form.Control
					as='textarea'
					rows={4}
					type='text'
					{...register('description')}
					isInvalid={!!errors.description}
				/>
			</Form.Group>

			<Button
				type='submit'
				variant='primary'
				className='d-flex align-items-center justify-content-center w-100 mb-2 mt-4'
			>
				{genre ? 'Update' : 'Add'}
			</Button>
		</Form>
	);
}
