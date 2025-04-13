import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('Login Data:', data);
		// Handle the form submission, like calling an API to log the user in
	};

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: '100vh' }}
		>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<h2 className='mb-4 text-center'>Login</h2>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId='email' className='mb-3'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							{...register('email', { required: 'Email is required' })}
							isInvalid={!!errors.email}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.email && errors.email.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='password' className='mb-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							{...register('password', { required: 'Password is required' })}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.password && errors.password.message}
						</Form.Control.Feedback>
					</Form.Group>

					{errors.email || errors.password ? (
						<Alert variant='danger'>Please fill in all required fields</Alert>
					) : null}

					<Button variant='primary' type='submit' block>
						Login
					</Button>
				</Form>
			</div>
		</Container>
	);
};

export default LoginForm;
