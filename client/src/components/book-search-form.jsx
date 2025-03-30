import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const BookSearchForm = ({ onSearch }) => {
	const [search, setSearch] = useState('');

	// Handle search input change
	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearch(value);
	};

	const handleClear = () => {
		setSearch('');
		onSearch('');
	};

	// Debounce search input
	useEffect(() => {
		const delaySearch = setTimeout(() => {
			onSearch(search);
		}, 1000); // 1 second delay

		return () => clearTimeout(delaySearch);
	}, [search, onSearch]);

	return (
		<Form
			className='mb-3 position-relative'
			onSubmit={(e) => e.preventDefault()}
		>
			<Form.Control
				type='text'
				placeholder='Search books...'
				value={search}
				onChange={handleSearchChange}
				style={{ paddingRight: '40px' }} // Add padding to avoid text overlap with button
			/>
			{search && (
				<Button
					className='btn'
					onClick={handleClear}
					style={{
						position: 'absolute',
						right: '5px',
						top: '50%',
						transform: 'translateY(-50%)',
						padding: '0',
						fontSize: '1.2rem',
						color: '#6c757d', // Gray color to match Bootstrap's secondary
						textDecoration: 'none', // Remove underline from link variant
						width: '35px',
						height: '35px',
						color: 'white',
					}}
				>
					×
				</Button>
			)}
		</Form>
	);
};

export default BookSearchForm;
