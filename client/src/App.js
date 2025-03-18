import AuthorList from "./components/AuthorList";
import BookList from "./components/BookList";
import Forms from "./components/Forms";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container } from "react-bootstrap";
import MainLayout from "./components/layout";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
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
