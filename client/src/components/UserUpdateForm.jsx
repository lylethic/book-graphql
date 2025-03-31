import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { updateUser } from '../graphql-client/mutation';
import { Form, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserUpdateForm = ({ isDialogOpen, setIsDialogOpen, user }) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			name: '',
			email: '',
			role: '',
			image: '',
		},
	});

	useEffect(() => {
		if (user) {
			setValue('id', user.id);
			setValue('name', user.name || '');
			setValue('email', user.email || '');
			setValue('role', user.role || '');
			setValue('image', user.image || '');
		}
	}, [user, setValue]);

	const imageValue = watch('image');

	const [editUser] = useMutation(updateUser, {
		onCompleted: () => {
			toast.success('Updated successfully!');
		},
	});

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

	const onSubmit = async (data) => {
		try {
			if (user) {
				await editUser({
					variables: {
						...data,
						image: data.image || user.image,
					},
				});
				console.log(data);

				setIsDialogOpen(false);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h4>{user ? 'Edit User' : 'Add New User'}</h4>
			{user && (
				<Form.Group>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='UserId...'
						{...register('id')}
						disabled
					/>
				</Form.Group>
			)}
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Username...'
					{...register('name', { required: 'Username is required' })}
				/>
				{errors.name && <p className='text-danger'>{errors.name.message}</p>}
			</Form.Group>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='email'
					placeholder='Email...'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Invalid email format',
						},
					})}
				/>
				{errors.email && <p className='text-danger'>{errors.email.message}</p>}
			</Form.Group>
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Role...'
					{...register('role', { required: 'Role is required' })}
				/>
				{errors.role && <p className='text-danger'>{errors.role.message}</p>}
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
							alt='User preview'
							fluid
							rounded
							className='shadow-sm'
							style={{ maxHeight: '200px', objectFit: 'cover' }}
						/>
					</div>
				)}
			</Form.Group>

			<Button
				className='d-flex justify-content-center align-items-center w-100 my-3'
				variant='primary'
				type='submit'
			>
				{user ? 'Update' : 'Add'}
			</Button>
		</Form>
	);
};

export default UserUpdateForm;
