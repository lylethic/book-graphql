import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainLayout from './components/layout';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<MainLayout />
		</ApolloProvider>
	);
}

export default App;
