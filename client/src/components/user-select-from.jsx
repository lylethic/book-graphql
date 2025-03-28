import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { getUsers } from '../graphql-client/queries';

const UserDropdown = ({ control, errors }) => {
	const dropdownRef = useRef(null);
	const [cursor, setCursor] = useState(null);

	// Fetch initial users with cursor-based pagination
	const { data, loading, fetchMore } = useQuery(getUsers, {
		variables: { limit: 50, cursor: null },
		fetchPolicy: 'cache-and-network',
	});

	const users = data?.users?.users || [];
	const nextCursor = data?.users?.nextCursor;

	useEffect(() => {
		setCursor(nextCursor);
	}, [nextCursor]);

	// Handle scroll event
	const handleScroll = () => {
		const dropdown = dropdownRef.current;
		if (
			dropdown &&
			dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight
		) {
			if (cursor) {
				fetchMore({
					variables: { limit: 50, cursor },
					updateQuery: (prev, { fetchMoreResult }) => {
						if (!fetchMoreResult) return prev;
						return {
							users: {
								...fetchMoreResult.users,
								users: [...prev.users.users, ...fetchMoreResult.users.users],
							},
						};
					},
				});
			}
		}
	};

	return (
		<Form.Group className='mb-3'>
			<Form.Label>User ID</Form.Label>
			{loading && users.length === 0 ? (
				<p>Loading users...</p>
			) : (
				<Controller
					name='userId'
					control={control}
					rules={{ required: 'Please select a user.' }}
					render={({ field }) => (
						<Form.Select
							{...field}
							className='text-capitalize'
							ref={dropdownRef}
							onScroll={handleScroll}
							style={{ maxHeight: '200px', overflowY: 'auto' }} // Enable scrolling
							isInvalid={!!errors.userId}
						>
							<option value=''>Please select a user...</option>
							{users.map((user) => (
								<option
									key={user.id}
									value={user.id}
									className='text-capitalize'
								>
									{user.name}
								</option>
							))}
						</Form.Select>
					)}
				/>
			)}
			{errors.userId && (
				<Form.Control.Feedback type='invalid'>
					{errors.userId?.message}
				</Form.Control.Feedback>
			)}
		</Form.Group>
	);
};

export default UserDropdown;
