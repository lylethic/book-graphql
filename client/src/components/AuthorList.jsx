import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthors } from '../graphql-client/queries';
import {
	Card,
	Row,
	Col,
	CardGroup,
	Button,
	Spinner,
	Container,
	Image,
} from 'react-bootstrap';
import AuthorDetails from './AuthorDetails';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import AuthorAddButton from './AuthorAddButton';
import { toast } from 'react-toastify';
import noImage from '../assets/no-image-available/no-img.png';
import AuthorDeleteButton from './AuthorDeleteButton';
import { Link } from 'react-router-dom';

const AuthorList = () => {
	const [authorSelected, setAuthorSelected] = useState(null);
	const [authorList, setAuthorList] = useState([]);

	const { loading, error, data, fetchMore, refetch } = useQuery(getAuthors, {
		variables: { limit: 50, cursor: null },
		fetchPolicy: 'cache-first',
	});

	// Function to load more authors
	const loadMoreAuthors = () => {
		fetchMore({
			variables: { cursor: data.authors.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;
				const newAuthors = fetchMoreResult.authors.authors.filter(
					(ng) => !prevResult.authors.authors.some((pg) => pg.id === ng.id)
				);

				return {
					authors: {
						...fetchMoreResult.authors,
						authors: [...prevResult.authors.authors, ...newAuthors],
					},
				};
			},
		});
	};

	const handleAuthorDeleted = (deleteAuthorId) => {
		if (authorSelected === deleteAuthorId) {
			setAuthorSelected(null);
		}
		refetch();
	};

	useEffect(() => {
		if (data) {
			setAuthorList((prev) => {
				const newAuthors = data.authors.authors.filter(
					(ng) => !prev.some((pg) => pg.id === ng.id)
				);
				return [...prev, ...newAuthors];
			});
		}
	}, [data]);

	const authorsToDisplay = useMemo(() => {
		return data ? data.authors.authors : [];
	}, [data]);

	if (loading)
		return (
			<div className='d-flex justify-content-center align-items-center w-100 h-auto p-5'>
				<Spinner animation='border' />
			</div>
		);
	if (error) {
		toast.error('Error loading authors...');
		return <p>Error loading authors...</p>;
	}

	return (
		<Container fluid>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>authors</h4>
				<AuthorAddButton />
			</div>
			<div className='row g-3'>
				{authorsToDisplay.length > 0 ? (
					authorsToDisplay.map((author) => (
						<div
							key={author.id}
							className={`mx-lg-2 mx-0 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column align-items-center justify-content-between p-3 border rounded shadow ${
								authorSelected === author.id ? 'outline-primary' : 'bg-light'
							}`}
							style={{
								overflow: 'hidden',
								minHeight: '300px',
							}}
							onClick={() => setAuthorSelected(author.id)}
						>
							<Image
								src={author.image || noImage}
								rounded
								width={'auto'}
								height={150}
								alt={author.name}
							/>
							<div
								style={{
									width: '100%',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									textAlign: 'center',
								}}
							>
								<Link
									to={`/authors/${author.id}`}
									className='mt-2 text-center text-capitalize text-decoration-none'
								>
									{author.name}
								</Link>
							</div>
							<div className='d-flex justify-content-center gap-2'>
								<AuthorDeleteButton
									authorId={author.id}
									refetchAuthors={handleAuthorDeleted}
								/>
							</div>
						</div>
					))
				) : (
					<p>No authors available</p>
				)}
				{/* Pagination Button */}
			</div>
			{data.authors.nextCursor && (
				<Button
					className='mt-3'
					style={{ backgroundColor: '#6861ce', borderColor: '#6861ce' }}
					onClick={loadMoreAuthors}
				>
					Load More <MdKeyboardDoubleArrowRight />
				</Button>
			)}
		</Container>
	);
};

export default AuthorList;
