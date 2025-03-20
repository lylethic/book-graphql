import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getSingleGenre } from '../../graphql-client/queries';
import { Button, Card } from 'react-bootstrap';
import GenreDeleteButton from './genre-delete-button';
import GenreUpsertForm from './genre-upsert-form';
import CustomModal from '../custom-modal-form';
import { toast } from 'react-toastify';

export default function GenreDetails({ genreId, refetchData }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);
	const handleShow = () => setIsOpen(true);

	const { loading, error, data } = useQuery(getSingleGenre, {
		variables: {
			id: genreId,
		},
		skip: genreId === null,
	});

	if (loading) return <p>Loading genre details...</p>;
	if (error) {
		console.log(error.message);
		toast.error('Error Loading genre details!');
		return <p>Error Loading genre details!</p>;
	}

	const genre = genreId !== null ? data.genre : null;

	return (
		<Card text='black' className='shadow'>
			<Card.Body>
				{genre === null ? (
					<Card.Text>Please select a genre</Card.Text>
				) : (
					<Fragment>
						<Card.Title className='text-capitalize'>
							Title: {genre.name}
						</Card.Title>
						<Card.Text className='fst-italic'>
							Description: {genre.description}
						</Card.Text>

						<div className='d-flex gap-2'>
							<GenreDeleteButton genreId={genreId} refetchData={refetchData} />
							<Button variant='warning' onClick={handleShow}>
								Update
							</Button>
							<CustomModal
								isOpen={isOpen}
								onClose={handleClose}
								title={'Update Genre'}
							>
								<GenreUpsertForm genre={genre} />
							</CustomModal>
						</div>
					</Fragment>
				)}
			</Card.Body>
		</Card>
	);
}
