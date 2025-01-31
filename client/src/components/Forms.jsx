import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BookForm from './BookForm';
import AuthorForm from './AuthorForm';

const Forms = () => {
	return (
		<Row>
			<Col xs={6}>
				<BookForm />
			</Col>

			{/*  */}
			<Col>
				<AuthorForm />
			</Col>
		</Row>
	);
};

export default Forms;
