// src/apollo-client/index.js
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

// Create an HTTP link
const httpLink = createHttpLink({
	uri: process.env.REACT_APP_API_URL || 'https://book-graphql-server.onrender.com',
	credentials: 'include', // Important for sending cookies with requests
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			);

			// Handle authentication errors
			if (message.includes('Unauthorized')) {
				console.log('Authentication error detected');
				// You could redirect to login page or trigger token refresh here
			}
		});
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
	}
});

// Auth link to attach the token to every request
const authLink = setContext((_, { headers }) => {
	// Get the authentication token from cookie
	const token = Cookies.get('jwt-access-token');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// Pagination merge functions for cache
const typePolicies = {
	Query: {
		fields: {
			books: {
				keyArgs: ['search'],
				merge(existing = { books: [] }, incoming) {
					return incoming;
				},
			},
			searchBook: {
				keyArgs: ['search'],
				merge(existing = { books: [] }, incoming) {
					return incoming;
				},
			},
		},
	},
};

// Create the Apollo Client instance
const client = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache({ typePolicies }),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'all',
		},
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
});

export default client;
