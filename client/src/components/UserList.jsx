import React, { useState } from "react";
import { Card, Row, Col, CardGroup, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { getUsers } from "../graphql-client/queries";
import UserDetails from "./UserDetails";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const UserList = () => {
	const [userSelected, setUserSelected] = useState(null);
	const { loading, error, data, refetch, fetchMore } = useQuery(getUsers, {
		variables: { limit: 5, cursor: null },
	});

	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error Loading users...</p>;

	// Function to load more books
	const loadMore = () => {
		fetchMore({
			variables: { cursor: data.users.nextCursor, limit: 5 },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				return {
					users: {
						users: [
							...prevResult.users.users,
							...fetchMoreResult.users.users,
						], // Append new users
						nextCursor: fetchMoreResult.users.nextCursor, // Update cursor
					},
				};
			},
		});
	};

	const handleUserDeleted = (deleteUserId) => {
		if (userSelected === deleteUserId) {
			setUserSelected(null);
		}
		refetch();
	};

	return (
		<Row>
			<h4 className="my-2 text-capitalize">users</h4>
			<Col xs={12} md={6} className="mb-lg-0 mb-3">
				<Card className="d-flex flex-row flex-wrap text-left">
					{data.users.users.map((user) => (
						<Button
							variant="outline-primary"
							key={user.id}
							border="info"
							text="info"
							className="m-2 text-center shadow pointer text-capitalize"
							onClick={setUserSelected.bind(this, user.id)}>
							{user.name}
						</Button>
					))}
				</Card>
				{/* Pagination Button */}
				{data.users.nextCursor && (
					<Button
						onClick={loadMore}
						className="mt-3"
						style={{
							backgroundColor: "#6861ce",
							borderColor: "#6861ce",
						}}>
						Load More <MdKeyboardDoubleArrowRight />
					</Button>
				)}
			</Col>
			<Col xs={12} md={6}>
				<UserDetails
					userId={userSelected}
					refetchUsers={handleUserDeleted}
				/>
			</Col>
		</Row>
	);
};

export default UserList;
