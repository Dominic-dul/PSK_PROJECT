import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import logo from '../images_for_pages/logo-removebg-preview.png'

const Footer = () => {
  return (
<div class="container">
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
    <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
          <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
    </ul>
    <p class="text-center text-muted">© 2023 Passatshop Ltd.</p>
  </footer>
</div>
  );
};

export default Footer;
