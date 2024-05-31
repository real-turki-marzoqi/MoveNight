import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo.png';
import { NavbarBrand } from 'react-bootstrap';

const NavBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value); // Pass the search query to the parent component
  };

  return (
    <>
      <Navbar className="custom-navbar">
        <Container className="d-flex justify-content-between align-items-center">
          <a href='/'>
          <img className='logo' src={logo} alt="Logo" />
          </a>
         
          <Form className="mx-auto" style={{ width: '80%' }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="custom-search-bar"
              aria-label="Search"
              value={query}
              onChange={handleSearchChange}
            />
          </Form>
          <div></div> {/* Add an empty div to balance the space */}
          <NavbarBrand className='turki'>T u r k i</NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
