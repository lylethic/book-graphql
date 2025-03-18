import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import BookAddButton from "./BookAddButton";
import AuthorAddButton from "./AuthorAddButton";
import UserAddButton from "./UserAddButton";
import PulishserAddButton from "./PublisherAddButton";

const Forms = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenBook, setIsOpenBook] = useState(false);
	const [isOpenUser, setIsOpenUser] = useState(false);
	const [isOpenPublisher, setIsOpenPublisher] = useState(false);

	return (
		<Row className="gy-3">
			<Col xs={12} md={4}>
				<BookAddButton
					isDialogOpen={isOpenBook}
					setIsDialogOpen={setIsOpenBook}
				/>
			</Col>

			<Col xs={12} md={4}>
				<AuthorAddButton
					isDialogOpen={isOpen}
					setIsDialogOpen={setIsOpen}
				/>
			</Col>

			<Col xs={12} md={4}>
				<UserAddButton
					isDialogOpen={isOpenUser}
					setIsDialogOpen={setIsOpenUser}
				/>
			</Col>

			<Col xs={12} md={4}>
				<PulishserAddButton
					isDialogOpen={isOpenPublisher}
					setIsDialogOpen={setIsOpenPublisher}
				/>
			</Col>
		</Row>
	);
};

export default Forms;
