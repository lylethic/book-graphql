import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	Button,
	Alert,
	Container,
	Row,
	Col,
	Card,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { login } from '../graphql-client/mutation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const LoginForm = () => {
	const navigate = useNavigate();
	const { login: loginContext, role } = useAuth();
	const emailInputRef = useRef();

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [loginUser] = useMutation(login, {
		onCompleted: (data) => {
			const token = data?.loginUser?.token;
			if (token) {
				loginContext({ token, role: role });
				toast.success('Login success!');
				navigate('/');
			}
		},
		onError: (error) => {
			toast.error('Failed to login: ' + error.message);
		},
	});

	const onSubmit = async (data) => {
		try {
			await loginUser({
				variables: {
					email: data.email,
					password: data.password,
				},
			});
		} catch (error) {
			console.error(`${error.message}`);
		}
	};

	return (
		<Container fluid className='vh-100'>
			<Row className='h-100'>
				{/* LEFT SECTION */}
				<Col
					md={6}
					className='d-flex flex-column justify-content-center align-items-center text-white'
					style={{
						background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
						padding: '2rem',
					}}
				>
					<h1 className='mb-3'>🌟 Welcome to Library</h1>
					<p className='lead text-center' style={{ maxWidth: '400px' }}>
						Explore you future!
					</p>
					<img
						src='/logo.svg'
						alt='logo'
						style={{ width: '150px', marginTop: '2rem' }}
					/>
				</Col>

				{/* RIGHT SECTION */}
				<Col
					md={6}
					className='d-flex justify-content-center align-items-center bg-light'
				>
					<Card
						className='shadow p-4 w-100 mx-3'
						style={{ maxWidth: '400px', borderRadius: '1rem' }}
					>
						<h3 className='text-center mb-4'>Login</h3>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group controlId='email' className='mb-3'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									{...register('email', { required: 'Email is required' })}
									type='email'
									className='rounded'
									placeholder='Enter your email'
									isInvalid={!!errors.email}
									ref={(e) => {
										register('email').ref(e);
										emailInputRef.current = e;
									}}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.email?.message}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId='password' className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									{...register('password', {
										required: 'Password is required',
									})}
									type='password'
									className='rounded'
									placeholder='Enter your password'
									autoComplete='current-password'
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.password?.message}
								</Form.Control.Feedback>
							</Form.Group>

							{errors.email || errors.password ? (
								<Alert variant='danger'>
									Please fill in all required fields
								</Alert>
							) : null}

							<Button
								variant='primary'
								type='submit'
								className='w-100 rounded-pill mt-3'
								style={{ fontWeight: 'bold' }}
							>
								Login
							</Button>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
