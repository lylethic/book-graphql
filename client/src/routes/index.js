import BookDetails from '../components/BookDetails';
import BookList from '../components/BookList';
import GenreDetails from '../components/genre/genre-details';
import GenreList from '../components/genre/genre-list';
import UserDetails from '../components/UserDetails';
import UserList from '../components/UserList';
import PublisherList from '../components/PublisherList';
import PublisherDetails from '../components/PublisherDetails';
import AuthorList from '../components/AuthorList';
import AuthorDetails from '../components/AuthorDetails';
import TransactionsList from '../components/transaction/transaction-list';
import TransactionDetail from '../components/transaction/transaction-detail';
import LoginForm from '../components/login';

export const storeRoutes = [
	{
		path: '/login',
		element: <LoginForm />,
	},
	{
		path: '/',
		element: <BookList />,
	},
	{
		path: '/books/:id',
		element: <BookDetails />,
	},
	{
		path: '/users',
		element: <UserList />,
	},
	{
		path: '/users/:id',
		element: <UserDetails />,
	},
	{
		path: '/genres',
		element: <GenreList />,
	},
	{
		path: '/genres/:id',
		element: <GenreDetails />,
	},
	{
		path: '/authors',
		element: <AuthorList />,
	},
	{
		path: '/authors/:id',
		element: <AuthorDetails />,
	},
	{
		path: '/publishers',
		element: <PublisherList />,
	},
	{
		path: '/publishers/:id',
		element: <PublisherDetails />,
	},
	{
		path: '/trans',
		element: <TransactionsList />,
	},
	{
		path: '/trans/:id',
		element: <TransactionDetail />,
	},
];
