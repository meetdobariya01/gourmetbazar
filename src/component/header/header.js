import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const Header = () => {
  const email = localStorage.getItem('email');
  const initial = email ? email.charAt(0).toUpperCase() : '';
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch(`http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Search results:", data);
        // You can update state or redirect to a search result page here
      })
      .catch(console.error);
  };

  return (
    <header>
      <Navbar expand="lg" bg="info" variant="dark" sticky="top" className="py-3">
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold">
            <img
              src="/image/logo-2.png"
              alt="Acha Bazar Logo"
              className="d-inline-block align-top me-2 logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Form className="d-flex flex-grow-1 mx-lg-3 my-3 my-lg-0" onSubmit={handleSearch}>
              <FormControl
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products (e.g. fish, apple, oil)"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </Form>


            <Nav className="ms-auto align-items-center">
              <NavDropdown title="Categories" id="categories-dropdown">
                {categories.map((cat, index) => {
                  const slug = cat.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <NavDropdown.Item key={index} as={Link} to={`/category/${slug}`}>
                      {cat}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>

              <Nav.Link href="/aboutus">About Us</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>

              <NavDropdown title="Pages" id="pages-dropdown">
                <NavDropdown.Item href="#offers">Offers</NavDropdown.Item>
                <NavDropdown.Item href="/privacypolicy">Privacy Policy</NavDropdown.Item>
                <NavDropdown.Item href="/termsandconditions">Terms & Conditions</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="d-none d-lg-block">
                <i className="bi bi-bell fs-5"></i>
              </Nav.Link>

              <Nav.Link className="d-none d-lg-block position-relative">
                <i className="bi bi-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </Nav.Link>

              <NavDropdown
                title={
                  <div
                    style={{
                      width: '35px',
                      height: '35px',
                      backgroundColor: '#ffffff',
                      color: '#198754',
                      fontWeight: 'bold',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #198754',
                      fontSize: '16px'
                    }}
                  >
                    {initial || <i className="bi bi-person"></i>}
                  </div>
                }
                id="profile-dropdown"
                align="end"
                className="d-none d-lg-block"
              >
                {!email && <NavDropdown.Item href="/login">Login</NavDropdown.Item>}
                {!email && <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>}
                {email && <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
