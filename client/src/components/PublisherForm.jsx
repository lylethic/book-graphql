import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getSinglePublisher } from '../graphql-client/queries';
import {
	createPublisher as addSinglePublisher,
	updatePublisher,
} from '../graphql-client/mutation';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const PublisherForm = ({ isDialogOpen, setIsDialogOpen, publisher }) => {
	const [publisherData, setPublisherData] = useState({
		id: '',
		name: '',
		address: '',
		contact: '',
	});

	// Update form when a book is passed (edit mode)
	useEffect(() => {
		if (publisher) {
			setPublisherData({
				id: publisher.id,
				name: publisher.name || '',
				address: publisher.address || '',
				contact: publisher.contact || '',
			});
		}
	}, [publisher]);

	const { id, name, address, contact } = publisherData;

	const onInputChange = (event) => {
		setPublisherData({
			...publisherData,
			[event.target.name]: event.target.value,
		});
	};

	// const onGenreChange = (selectedGenre) => {
	// 	setBookData((prevBook) => ({ ...prevBook, genre: selectedGenre }));
	// };

	// GraphQL operations
	// const { loading, data } = useQuery(getAuthors);
	const [addPublisher] = useMutation(addSinglePublisher, {
		onCompleted: () => {
			toast.success('Publisher added successfully!');
			setPublisherData({ contact: '', name: '', address: '', id: '' });
		},
		onError: () => {
			toast.error('Faild to add...');
		},
		refetchQueries: [{ query: getSinglePublisher }],
	});

	const [editPublisher] = useMutation(updatePublisher, {
		onCompleted: () => {
			toast.success('Publisher updated successfully!');
		},
		onError: () => {
			toast.error('Faild to update...');
		},
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		if (publisher) {
			// Update existing book
			await editPublisher({
				variables: {
					updatePublisherId: publisher.id,
					name,
					address,
					contact,
				},
			});
			setIsDialogOpen(false);
			console.log({
				id: publisher.id,
				name,
				address,
				contact,
			});
		} else {
			await addPublisher({
				variables: {
					publishers: [{ name, address, contact }],
				},
			});
		}
		setPublisherData({ id: '', name: '', address: '', contact: '' });
	};

	return (
		<Form onSubmit={onSubmit}>
			{publisher && (
				<Form.Group>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='PublisherId...'
						name='id'
						value={id}
						onChange={onInputChange}
						disabled
					/>
				</Form.Group>
			)}
			<Form.Group>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Publisher name...'
					name='name'
					value={name}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Address...'
					name='address'
					value={address}
					onChange={onInputChange}
				/>
			</Form.Group>
			<Form.Group className='mb-2'>
				<Form.Control
					className='mb-2'
					type='text'
					placeholder='Contact...'
					name='contact'
					value={contact}
					onChange={onInputChange}
				/>
			</Form.Group>

			<Button
				className='d-flex align-items-center justify-content-center w-100 mb-2 mt-4'
				variant='primary'
				type='submit'
			>
				{publisher ? 'Update Publisher' : 'Add Publisher'}
			</Button>
		</Form>
	);
};

export default PublisherForm;
