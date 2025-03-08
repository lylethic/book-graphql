import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarMenu() {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand href='#home'>Book store</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						{/* <Nav.Link href='#books'>Books</Nav.Link>
						<Nav.Link href='#users'>Users</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarMenu;
