import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import logo from '../images_for_pages/logo-removebg-preview.png'


function Header() {
  const { user, isAuthenticated } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand>
          <Link to="/">
              <img
                src={logo}
                width="120"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
          <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
          {isAuthenticated && <Nav.Link as={Link} to="/cart">Cart</Nav.Link>}
          {isAuthenticated && user.email == "admin@admin.com" && <Nav.Link as={Link} to="/orders">Orders</Nav.Link>}
          {isAuthenticated && user.email == "admin@admin.com" && <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <LogoutButton user={user}></LogoutButton>}
        </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
