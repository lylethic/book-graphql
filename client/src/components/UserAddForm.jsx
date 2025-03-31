import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { getUsers } from '../graphql-client/queries';
import { createUser } from '../graphql-client/mutation';
import { Controller, useForm } from 'react-hook-form';
import { Form, Button, Image } from 'react-bootstrap';

export default function UserAddForm({ isDialogOpen, setIsDialogOpen, user }) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
		control,
		watch,
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: '',
			image: null,
		},
	});

	const imageValue = watch('image'); // Watch image field for preview
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
	// Populate form when editing
	useEffect(() => {
		if (user) {
			setValue('name', user.name || '');
			setValue('email', user.email || '');
			setValue('password', '');
			setValue('role', user.role || '');
			setValue('image', user.image || null);
		}
	}, [user, setValue]);

	const [addNewUser] = useMutation(createUser, {
		onCompleted: () => {
			alert('User added successfully!');
			reset();
		},
		refetchQueries: [{ query: getUsers }],
	});

	// Image upload handler
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setValue('image', reader.result);
			};
		}
	};

	const onSubmit = async (data) => {
		await addNewUser({
			variables: {
				name: data.name,
				email: data.email,
				password: data.password,
				role: data.role,
				image: data.image,
			},
		});
		reset();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Username...'
					{...register('name')}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Control
					className='mb-2'
					type='email'
					placeholder='Email...'
					{...register('email')}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Control
					className='mb-2'
					type='password'
					placeholder='Password...'
					{...register('password')}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Control as='select' className='mb-2' {...register('role')}>
					<option value=''>Select Role...</option>
					<option value='user'>User</option>
					<option value='admin'>Admin</option>
				</Form.Control>
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Image</Form.Label>
				<Controller
					name='image'
					control={control}
					rules={{
						required: !user && 'Please upload an image for a new user.',
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
				className='d-flex w-100 align-items-center justify-content-center my-3'
				variant='primary'
				type='submit'
			>
				{user ? 'Update User' : 'Add User'}
			</Button>
		</Form>
	);
}
