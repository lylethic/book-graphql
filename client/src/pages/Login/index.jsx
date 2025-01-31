import React from 'react';
import { Form, Input } from 'react-bootstrap';

const Login = () => {
	return (
		<Form>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>Email</Form.Label>
				<Form.Control type='email' placeholder='myemail@gmail.com' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='pass'>
				<Form.Label>Password</Form.Label>
				<Form.Control type='password' placeholder='myemail@gmail.com' />
			</Form.Group>
		</Form>
	);
};

export default Login;
