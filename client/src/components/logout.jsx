import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../graphql-client/mutation';
import { Button } from 'react-bootstrap';
import { MdOutlineExitToApp } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth-context';

export default function Logout() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const [logoutRes] = useMutation(logoutUser, {
		onCompleted: (data) => {
			logout();
			toast.success('Logout success!');
			navigate('/login');
		},
		onError: (error) => {
			toast.error('Failed to logout: ' + error.message);
		},
	});

	const handleLogout = async () => {
		try {
			await logoutRes();
			console.log('Logout success!');
		} catch (error) {
			console.log('Logout error:', error.message);
		}
	};

	return (
		<Button
			title='Logout'
			type='button'
			className='ms-auto'
			onClick={handleLogout}
		>
			<MdOutlineExitToApp />
		</Button>
	);
}
