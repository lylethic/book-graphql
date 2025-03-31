import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavbarMenu from './navbar';

export default function ClientLayout() {
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

// <Card className='p-4 shadow-sm mb-4'>
// 				<BookList />
// 			</Card>

// 			<Card className='p-4 shadow-sm mb-4'>
// 				<GenreList />
// 			</Card>

// 			<Card className='p-4 shadow-sm mb-4'>
// 				<AuthorList />
// 			</Card>

// 			<Card className='p-4 shadow-sm mb-4'>
// 				<UserList />
// 			</Card>

// 			<Card className='p-4 shadow-sm mb-4'>
// 				<TransactionList />
// 			</Card>

// <Card className='p-4 shadow-sm'>
// 	<FineList />
// </Card>

// <Card className='p-4 shadow-sm'>
// 	<PublisherList />
// </Card>
