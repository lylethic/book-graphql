import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavbarMenu from '../components/navbar';

export default function AdminLayout() {
	return (
		<main className='overflow-y-auto'>
			<NavbarMenu />
			<Container fluid={'md'} style={{ backgroundColor: '#f5f7fd' }}>
				<h1 className='text-capitalize text-center text-primary-emphasis mb-3'>
					📚 My Library
				</h1>
				<hr />
				<Outlet />
			</Container>
		</main>
	);
}
