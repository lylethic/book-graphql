import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainLayout from './components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<MainLayout />
			<ToastContainer position='top-right' autoClose={3000} />
		</ApolloProvider>
	);
}

export default App;
