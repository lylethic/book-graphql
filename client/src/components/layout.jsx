import React from 'react';
import NavbarMenu from './navbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container } from 'react-bootstrap';
import Forms from './Forms';
import BookList from './BookList';
import AuthorList from './AuthorList';
import UserList from './UserList';

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
						my books
					</h1>
					<hr />
					<Forms />
					<hr />
					<BookList />
					<hr />
					<AuthorList />
					<hr />
					<UserList />
				</Container>
			</ApolloProvider>
		</main>
	);
}
