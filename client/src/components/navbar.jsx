import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Logout from './logout';
import '../assets/styles.css';

function NavbarMenu() {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand href='/'>Book Store</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Home
						</NavLink>
						<NavLink
							to='/users'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Users
						</NavLink>
						<NavLink
							to='/genres'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Genres
						</NavLink>
						<NavLink
							to='/authors'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Authors
						</NavLink>
						<NavLink
							to='/trans'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Transactions
						</NavLink>
						<NavLink
							to='/publishers'
							className={({ isActive }) =>
								isActive ? 'nav-link active' : 'nav-link'
							}
						>
							Publishers
						</NavLink>
					</Nav>
					<Logout />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarMenu;
