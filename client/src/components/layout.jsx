import React, { useState } from 'react';
import NavbarMenu from './navbar';
import { Container, Card, Alert } from 'react-bootstrap';
import Forms from './Forms';
import BookList from './BookList';
import AuthorList from './AuthorList';
import UserList from './UserList';
import TransactionList from './transaction/transaction-list';
import PublisherList from './PublisherList';
import ReviewList from './ReviewList';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import FineList from './transaction/fine-list';
import BookAndReview from './BookAndReview';

export default function MainLayout() {
	const client = new ApolloClient({
		uri: 'http://localhost:4000/graphql',
		cache: new InMemoryCache(),
	});

	return (
		<main className='overflow-y-auto'>
			<NavbarMenu />

			<ApolloProvider client={client}>
				<Container
					fluid={'xl'}
					style={{ backgroundColor: '#f5f7fd' }}
					className='rounded-5 p-5 my-3'
				>
					<h1 className='text-primary-emphasis text-capitalize text-center mb-3'>
						📚 My Books Collection
					</h1>
					<hr />
					<Forms />

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
			</ApolloProvider>
		</main>
	);
}
