import React, { useState } from "react";
import NavbarMenu from "./navbar";
import { Container, Card, Alert } from "react-bootstrap";
import Forms from "./Forms";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import UserList from "./UserList";
import TransactionList from "./transaction/transaction-list";
import PublisherList from "./PublisherList";
import ReviewList from "./ReviewList";

export default function MainLayout() {
	const [selectedBookId, setSelectedBookId] = useState(null);
	console.log("selectedBookId:", selectedBookId);

	return (
		<main className="overflow-y-auto">
			<NavbarMenu />
			<Container
				fluid={"xl"}
				className="bg-light rounded-5 shadow p-5 my-4"
				style={{ maxWidth: "1200px" }}>
				<h1 className="text-primary text-center fw-bold mb-4">
					📚 My Books Collection
				</h1>

				<Card className="p-4 mb-4 shadow-sm">
					<Forms />
				</Card>

				<Card className="p-4 mb-4 shadow-sm">
					<BookList setSelectedBookId={setSelectedBookId} />
				</Card>

				{/* Hiển thị review chỉ khi đã chọn sách */}
				<Card className="p-4 mb-4 shadow-sm">
					{selectedBookId ? (
						<ReviewList bookId={selectedBookId} />
					) : (
						<Alert variant="info" className="text-center">
							📝 Hãy chọn một cuốn sách để xem review!
						</Alert>
					)}
				</Card>

				<Card className="p-4 mb-4 shadow-sm">
					<AuthorList />
				</Card>

				<Card className="p-4 mb-4 shadow-sm">
					<UserList />
				</Card>

				<Card className="p-4 mb-4 shadow-sm">
					<TransactionList />
				</Card>

				<Card className="p-4 shadow-sm">
					<PublisherList />
				</Card>
			</Container>
		</main>
	);
}
