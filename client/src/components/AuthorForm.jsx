import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import { addSingleAuthor, updateAuthor } from '../graphql-client/mutation';

import { Button, Form, FormLabel, Image } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AuthorForm = ({ author, isDialogOpen, setIsDialogOpen, refetch }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			name: '',
			age: '',
			image: null,
		},
	});

	const imageValue = watch('image');

	useEffect(() => {
		if (author) {
			reset({
				id: author.id || '',
				name: author.name || '',
				age: parseInt(author.age) || author.age || 0,
				image: author.image || '',
			});
		} else {
			reset({
				id: '',
				name: '',
				age: 0,
				image: '',
			});
		}
	}, [author, reset]);

	//GraphQL operations
	const [add] = useMutation(addSingleAuthor, {
		onCompleted: () => {
			toast.success('Author added successfully!');
			setIsDialogOpen(false);
			reset();
		},
		onError: (error) => {
			toast.error('Failed to create author: ' + error.message);
		},
	});

	const [edit] = useMutation(updateAuthor, {
		onCompleted: () => {
			toast.success('Author edit successfully');
			setIsDialogOpen(false);
		},
		onError: (error) => {
			toast.error('Failed to edit author...');
			console.error(error.message);
		},
	});

	const onSubmit = async (data) => {
		try {
			if (author)
				await edit({
					variables: {
						id: author.id,
						name: data.name,
						age: parseInt(data.age),
						image:
							data.image && !data.image.startsWith('http') ? data.image : null,
					},
				});
			else {
				await add({
					variables: {
						name: data.name,
						age: parseInt(data.age),
						image: data.image,
					},
				});
			}
		} catch (error) {
			toast.error('Error...');
			console.error(`${error.message}`);
		}
	};

	const handleFileChange = (e, onChange) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onChange(reader.result); // Set base64 string
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{author && (
				<Form.Group className='mb-2'>
					<Form.Label>Book ID</Form.Label>
					<Controller
						name='id'
						control={control}
						render={({ field }) => (
							<Form.Control
								type='text'
								placeholder='Author...'
								{...field}
								disabled
							/>
						)}
					/>
				</Form.Group>
			)}

			<Form.Group className='mb-2'>
				<Form.Label>Author Name</Form.Label>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Please provide a author name.' }}
					render={({ field }) => (
						<Form.Control
							type='text'
							placeholder='Author name...'
							{...field}
							isInvalid={!!errors.name}
						/>
					)}
				/>

				{errors.name && (
					<Form.Control.Feedback type='invalid'>
						{errors.name.message}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Author age</Form.Label>
				<Controller
					name='age'
					control={control}
					rules={{ required: 'Please provide author age.' }}
					render={({ field }) => (
						<Form.Control
							type='text'
							placeholder='AUthor age...'
							{...field}
							isInvalid={!!errors.age}
						/>
					)}
				/>

				{errors.age && (
					<Form.Control.Feedback type='invalid'>
						{errors.age.message}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Image</Form.Label>
				<Controller
					name='image'
					control={control}
					rules={{
						required: !author && 'Please upload an image for a new author.',
					}}
					render={({ field: { onChange, value, ...field } }) => (
						<Form.Control
							type='file'
							accept='image/*'
							onChange={(e) => handleFileChange(e, onChange)}
							disabled={false}
							isInvalid={!!errors.image}
							{...field}
						/>
					)}
				/>
				{errors.image && (
					<Form.Control.Feedback type='invalid'>
						{errors.image.message}
					</Form.Control.Feedback>
				)}
				{imageValue && (
					<div className='mt-2'>
						<p>
							{imageValue.startsWith('http')
								? 'Current Image:'
								: 'Image Preview:'}
						</p>
						<Image
							src={imageValue}
							alt='Book preview'
							fluid
							rounded
							className='shadow-sm'
							style={{ maxHeight: '200px', objectFit: 'cover' }}
						/>
					</div>
				)}
			</Form.Group>

			<Button
				className='d-flex align-items-center justify-content-center w-100 my-3'
				variant='primary'
				type='submit'
			>
				{author ? 'Update author' : 'Add author'}
			</Button>
		</Form>
	);
};

export default AuthorForm;
