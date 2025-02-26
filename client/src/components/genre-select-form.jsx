import { useQuery } from '@apollo/client';
import React from 'react';
import { getGenres } from '../graphql-client/queries';
import { Form } from 'react-bootstrap';

export default function GenreSelectForm({ selectedGenre, onSelectedGenre }) {
	const { data, loading, error } = useQuery(getGenres);
	if (loading) return <p>Loading genres...</p>;
	if (error) return <p>Error loading genres</p>;

	return (
		<Form.Select
			className='text-capitalize'
			aria-label='Please select a genre'
			value={selectedGenre}
			onChange={(e) => onSelectedGenre(e.target.value)}
		>
			<option>Please select a genre...</option>
			{data.genres.map((key) => (
				<option value={key.id} key={key.id} className='text-capitalize'>
					{key.name}
				</option>
			))}
		</Form.Select>
	);
}
