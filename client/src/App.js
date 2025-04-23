import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
} from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { useAuth } from './context/auth-context';
import AdminLayout from './layouts/layout';
import { publicRoutes, storeRoutes } from './routes';
import LoginForm from './components/login';
import client from './apollo-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ isAuthenticated, role }) => {
	if (!isAuthenticated && role === null) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

function App() {
	const { user, role, isAuthenticated } = useAuth();
	console.log(isAuthenticated);

	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route
						path='/login'
						element={
							isAuthenticated ? <Navigate to={'/'} replace /> : <LoginForm />
						}
					/>

					{!user &&
						publicRoutes.map((route, index) => (
							<Route key={index} path={route.path} element={route.element} />
						))}

					<Route
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated} role={role} />
						}
					>
						{isAuthenticated && (
							<Route path='/' element={<AdminLayout />}>
								{storeRoutes.map((route, index) => (
									<Route
										key={index}
										path={route.path}
										element={route.element}
									/>
								))}
							</Route>
						)}
					</Route>
					<Route path='*' element={<Navigate to='/login' replace />} />
				</Routes>
			</Router>
			<ToastContainer position='top-right' autoClose={3000} />
		</ApolloProvider>
	);
}

export default App;
