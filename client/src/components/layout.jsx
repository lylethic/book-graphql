import React from 'react';
import NavbarMenu from './navbar';
import { Container, Card } from 'react-bootstrap';
import AuthorList from './AuthorList';
import UserList from './UserList';
import TransactionList from './transaction/transaction-list';
import PublisherList from './PublisherList';
import FineList from './transaction/fine-list';
import BookAndReview from './BookAndReview';
import GenreList from './genre/genre-list';
import BookList from './BookList';

export default function MainLayout() {
	return (
		<main className='overflow-y-auto'>
			<NavbarMenu />

			<Container
				fluid
				style={{ backgroundColor: '#f5f7fd' }}
				className='p-5 rounded-5 my-3'
			>
				<h1 className='text-capitalize text-center text-primary-emphasis mb-3'>
					📚 My Books Collection
				</h1>
				<hr />

				{/* <BookAndReview /> */}
				<Card className='p-4 shadow-sm mb-4'>
					<BookList />
				</Card>

				<Card className='p-4 shadow-sm mb-4'>
					<GenreList />
				</Card>

				<Card className='p-4 shadow-sm mb-4'>
					<AuthorList />
				</Card>

				<Card className='p-4 shadow-sm mb-4'>
					<UserList />
				</Card>

				<Card className='p-4 shadow-sm mb-4'>
					<TransactionList />
				</Card>

				{/* <Card className='p-4 shadow-sm'>
					<FineList />
				</Card> */}

				<Card className='p-4 shadow-sm'>
					<PublisherList />
				</Card>
			</Container>
		</main>
	);
}
