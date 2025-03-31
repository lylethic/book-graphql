import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import {
	getAllPublishers,
	getAuthors,
	getBooks,
	getGenres,
} from '../graphql-client/queries';
import { addSingleBook, updateBook } from '../graphql-client/mutation';
import { Form, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BookForm = ({ isDialogOpen, setIsDialogOpen, book, refetch }) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			name: '',
			genre: '',
			authorId: '',
			publisherId: '',
			image: '',
		},
	});

	const imageValue = watch('image'); // Watch image field for preview

	// Populate form with book data when editing
	useEffect(() => {
		if (book) {
			reset({
				id: book.id || '',
				name: book.name || '',
				genre: book.genre?.id || book.genre || '',
				authorId: book.authorId?.id || book.authorId || '',
				publisherId: book.publisherId?.id || book.publisherId || '',
				image: book.image || '',
			});
		} else {
			reset({
				id: '',
				name: '',
				genre: '',
				authorId: '',
				publisherId: '',
				image: '',
			});
		}
	}, [book, reset]);

	const { loading: loadingAuthors, data: authorsData } = useQuery(getAuthors);
	const { loading: loadingPublishers, data: publishersData } =
		useQuery(getAllPublishers);
	const { loading: loadingGenres, data: genreData } = useQuery(getGenres);

	const [addBook] = useMutation(addSingleBook, {
		onCompleted: () => {
			toast.success('Book added successfully!');
			reset();
			setIsDialogOpen(false);
			refetch();
		},
		onError: (error) => {
			toast.error('Failed to create book: ' + error.message);
		},
		refetchQueries: [{ query: getBooks }],
	});

	const [editBook] = useMutation(updateBook, {
		onCompleted: () => {
			toast.success('Book updated successfully!');
			setIsDialogOpen(false);
		},
		onError: (error) => {
			toast.error('Failed to update book: ' + error.message);
		},
	});

	const onSubmit = async (data) => {
		try {
			if (book) {
				await editBook({
					variables: {
						id: book.id,
						name: data.name,
						genre: data.genre,
						authorId: data.authorId,
						publisherId: data.publisherId || null,
						image:
							data.image && !data.image.startsWith('http') ? data.image : null,
					},
				});
			} else {
				await addBook({
					variables: {
						name: data.name,
						genre: data.genre,
						authorId: data.authorId,
						publisherId: data.publisherId || null,
						image: data.image,
					},
				});
			}
		} catch (error) {
			toast.error('Error processing form: ' + error.message);
		}
	};

	const handleFileChange = (e, onChange) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onChange(reader.result); // Set base64 string
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{book && (
				<Form.Group className='mb-2'>
					<Form.Label>Book ID</Form.Label>
					<Controller
						name='id'
						control={control}
						render={({ field }) => (
							<Form.Control
								type='text'
								placeholder='BookId...'
								{...field}
								disabled
							/>
						)}
					/>
				</Form.Group>
			)}

			<Form.Group className='mb-2'>
				<Form.Label>Book Name</Form.Label>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Please provide a book name.' }}
					render={({ field }) => (
						<Form.Control
							type='text'
							placeholder='Book name...'
							{...field}
							isInvalid={!!errors.name}
						/>
					)}
				/>

				{errors.name && (
					<Form.Control.Feedback type='invalid'>
						{errors.name.message}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Genre</Form.Label>
				{loadingGenres ? (
					<p>Loading genres...</p>
				) : (
					<Controller
						name='genre'
						control={control}
						rules={{ required: 'Please select a genre.' }}
						render={({ field }) => (
							<Form.Select
								className='text-capitalize'
								aria-label='Please select a genre'
								{...field}
								isInvalid={!!errors.genre}
							>
								<option value=''>Please select a genre...</option>
								{genreData?.genres.genres.map((genre) => (
									<option
										key={genre.id}
										value={genre.id}
										className='text-capitalize'
									>
										{genre.name}
									</option>
								))}
							</Form.Select>
						)}
					/>
				)}
				{errors.genre && (
					<Form.Control.Feedback type='invalid'>
						{errors.genre.message}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Author</Form.Label>
				{loadingAuthors ? (
					<p>Loading authors...</p>
				) : (
					<Controller
						name='authorId'
						control={control}
						rules={{ required: 'Please select an author.' }}
						render={({ field }) => (
							<Form.Select {...field} isInvalid={!!errors.authorId}>
								<option value=''>Select author</option>
								{authorsData?.authors.authors.map((author) => (
									<option key={author.id} value={author.id}>
										{author.name}
									</option>
								))}
							</Form.Select>
						)}
					/>
				)}
				{errors.authorId && (
					<Form.Control.Feedback type='invalid'>
						{errors.authorId.message}
					</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Publisher (Optional)</Form.Label>
				{loadingPublishers ? (
					<p>Loading publishers...</p>
				) : (
					<Controller
						name='publisherId'
						control={control}
						render={({ field }) => (
							<Form.Select {...field}>
								<option value=''>Select publisher</option>
								{publishersData?.publishers.publishers.map((publisher) => (
									<option key={publisher.id} value={publisher.id}>
										{publisher.name}
									</option>
								))}
							</Form.Select>
						)}
					/>
				)}
			</Form.Group>

			<Form.Group className='mb-2'>
				<Form.Label>Image</Form.Label>
				<Controller
					name='image'
					control={control}
					rules={{
						required: !book && 'Please upload an image for a new book.',
					}}
					render={({ field: { onChange, value, ...field } }) => (
						<Form.Control
							type='file'
							accept='image/*'
							onChange={(e) => handleFileChange(e, onChange)}
							disabled={false}
							isInvalid={!!errors.image}
							{...field}
						/>
					)}
				/>
				{errors.image && (
					<Form.Control.Feedback type='invalid'>
						{errors.image.message}
					</Form.Control.Feedback>
				)}
				{imageValue && (
					<div className='mt-2'>
						<p>
							{imageValue.startsWith('http')
								? 'Current Image:'
								: 'Image Preview:'}
						</p>
						<Image
							src={imageValue}
							alt='Book preview'
							fluid
							rounded
							className='shadow-sm'
							style={{ maxHeight: '200px', objectFit: 'cover' }}
						/>
					</div>
				)}
			</Form.Group>

			<Button
				variant='primary'
				type='submit'
				className='d-flex w-100 align-items-center justify-content-center my-3'
			>
				{book ? 'Update Book' : 'Add Book'}
			</Button>
		</Form>
	);
};

export default BookForm;
