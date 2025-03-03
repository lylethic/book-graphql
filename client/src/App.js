import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import Forms from './components/Forms';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container } from 'react-bootstrap';
import MainLayout from './components/layout';

function App() {
	return <MainLayout />;
}

export default App;
