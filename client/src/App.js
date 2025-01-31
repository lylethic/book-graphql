import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import Forms from './components/Forms';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container } from 'react-bootstrap';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Container className='py-3 my-3 bg-primary-subtle'>
				<h1 className='text-primary-emphasis text-capitalize text-center mb-3'>
					my books
				</h1>
				<hr />
				<Forms />
				<hr />
				<BookList />
				<hr />
				<AuthorList />
			</Container>
		</ApolloProvider>
	);
}

export default App;
