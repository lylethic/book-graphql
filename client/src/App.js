import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ClientLayout from './components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeRoutes } from './routes';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path='/' element={<ClientLayout />}>
						{storeRoutes.map((route, index) => (
							<Route key={index} path={route.path} element={route.element} />
						))}
					</Route>
				</Routes>
			</Router>
			<ToastContainer position='top-right' autoClose={3000} />
		</ApolloProvider>
	);
}

export default App;
