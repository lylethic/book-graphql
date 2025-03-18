import React from 'react';
import NavbarMenu from './navbar';
import { Container, Card } from 'react-bootstrap';
import AuthorList from './AuthorList';
import UserList from './UserList';
import TransactionList from './transaction/transaction-list';
import PublisherList from './PublisherList';
import FineList from './transaction/fine-list';
import BookAndReview from './BookAndReview';

export default function MainLayout() {
	return (
		<main className='overflow-y-auto'>
			<NavbarMenu />

			<Container
				fluid={'xl'}
				style={{ backgroundColor: '#f5f7fd' }}
				className='rounded-5 p-5 my-3'
			>
				<h1 className='text-primary-emphasis text-capitalize text-center mb-3'>
					📚 My Books Collection
				</h1>
				<hr />

				<BookAndReview />

				<Card className='p-4 mb-4 shadow-sm'>
					<AuthorList />
				</Card>

				<Card className='p-4 mb-4 shadow-sm'>
					<UserList />
				</Card>

				<Card className='p-4 mb-4 shadow-sm'>
					<TransactionList />
				</Card>

				<Card className='p-4 shadow-sm'>
					<FineList />
				</Card>

				<Card className='p-4 shadow-sm'>
					<PublisherList />
				</Card>
			</Container>
		</main>
	);
}
