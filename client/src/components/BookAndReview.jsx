import React, { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import BookList from './BookList';
import ReviewList from './ReviewList';

export default function BookAndReview() {
	const [selectedBookId, setSelectedBookId] = useState(null);
	console.log('selectedBookId:', selectedBookId);

	return (
		<>
			<Card className='p-4 mb-4 shadow-sm'>
				<BookList setSelectedBookId={setSelectedBookId} />
			</Card>

			{/* Hiển thị review chỉ khi đã chọn sách */}
			<Card className='p-4 mb-4 shadow-sm'>
				{selectedBookId ? (
					<ReviewList bookId={selectedBookId} />
				) : (
					<Alert variant='info' className='text-center'>
						📝 Hãy chọn một cuốn sách để xem review!
					</Alert>
				)}
			</Card>
		</>
	);
}
