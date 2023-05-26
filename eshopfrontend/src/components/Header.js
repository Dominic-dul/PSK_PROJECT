import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';


function Header() {
  const { user, isAuthenticated } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch('http://localhost:9999/auth0/private', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      // Do something with responseData here

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand>
        <Link to="/">PassatShop</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
          <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {/* <button onClick={callApi}>CallAPI</button> */}
          {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <LogoutButton user={user}></LogoutButton>}
        </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
