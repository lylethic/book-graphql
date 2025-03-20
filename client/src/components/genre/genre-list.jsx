import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../../graphql-client/queries';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import GenreDetails from './genre-details';
import GenreUpsertForm from './genre-upsert-form';
import CustomModal from '../custom-modal-form';
import { toast } from 'react-toastify';

export default function GenreList() {
	const [selected, setSelected] = useState(null);
	const [genreList, setGenreList] = useState([]);

	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);
	const handleShow = () => setIsOpen(true);

	const { loading, error, data, fetchMore } = useQuery(getGenres, {
		variables: {
			limit: 10,
			cursor: null,
		},
	});

	// Populate genreList only with new genres (no duplicates)
	useEffect(() => {
		if (data) {
			setGenreList((prev) => {
				const newGenres = data.genres.genres.filter(
					(ng) => !prev.some((pg) => pg.id === ng.id)
				);
				return [...prev, ...newGenres];
			});
		}
	}, [data]);

	// Load more genres and append only new ones
	const loadMoreGenres = () => {
		fetchMore({
			variables: { cursor: data.genres.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				const combinedGenres = [
					...prevResult.genres.genres,
					...fetchMoreResult.genres.genres,
				];

				return {
					genres: {
						genres: combinedGenres,
						nextCursor: fetchMoreResult.genres.nextCursor,
					},
				};
			},
		});
	};

	// Remove genre from local state
	const handleRefreshData = (genreId) => {
		if (selected === genreId) setSelected(null);
		setGenreList((prev) => prev.filter((g) => g.id !== genreId));
	};

	if (loading && genreList.length === 0) return <p>Loading genres...</p>;
	if (error) {
		toast.error('Error Loading genres...');
		return <p>Error Loading genres...</p>;
	}

	return (
		<Row>
			<div className='d-flex align-items-center justify-content-between my-2'>
				<h4 className='text-capitalize my-2'>genres</h4>
				<>
					<Button variant='success' onClick={handleShow}>
						Add new genre
					</Button>
					<CustomModal
						isOpen={isOpen}
						onClose={handleClose}
						title={'Add new  Genre'}
					>
						<GenreUpsertForm />
					</CustomModal>
				</>
			</div>
			<Col xs={12} md={6} className='mb-3 mb-lg-0'>
				<Card className='d-flex flex-row flex-wrap text-left'>
					{genreList.map((genre) => (
						<Button
							variant={selected === genre.id ? 'primary' : 'outline-primary'}
							key={genre.id}
							className='m-2 shadow text-capitalize text-center pointer'
							onClick={() => setSelected(genre.id)}
						>
							{genre.name}
						</Button>
					))}
				</Card>

				{/* Pagination Button */}
				{data?.genres?.nextCursor && (
					<Button
						onClick={loadMoreGenres}
						className='mt-3'
						style={{
							backgroundColor: '#6861ce',
							borderColor: '#6861ce',
						}}
					>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<GenreDetails genreId={selected} refetchData={handleRefreshData} />
			</Col>
		</Row>
	);
}
