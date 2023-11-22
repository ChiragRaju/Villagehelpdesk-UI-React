import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Houses } from 'react-bootstrap-icons';
import { ListTask } from 'react-bootstrap-icons';
import { PersonPlus } from 'react-bootstrap-icons';

import emblem from '../assets/emblem.png';
import '../components/Navbar.css';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
        <Navbar.Brand href="/">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={emblem} width="40" height="40" alt="" style={{ marginRight: '10px' }} />
    VillageHelpDesk
  </div>
</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ fontSize: '20px' }}>
              <Nav.Link className="nav-links" href="/" style={{ color: '#ffff', padding: '5px' }}>
                <Houses style={{ height: '30px' }} /> Home
              </Nav.Link>
              <Nav.Link className="nav-links" href="/Services" style={{ color: '#ffff', padding: '5px' }}>
                Services
              </Nav.Link>
              <Nav.Link className="nav-links" href="/UserRegistration" style={{ color: '#ffff', padding: '5px' }}>
                <PersonPlus style={{ height: '30px' }} /> SignUp
              </Nav.Link>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Login"
                menuVariant="dark"
                align="end"
              >
                <NavDropdown.Item className="dropdown" href="/Adminlogin">
                  <ListTask /> Admin Login
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown" href="/Login">
                  <ListTask /> User Login
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
