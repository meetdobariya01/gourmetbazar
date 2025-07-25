import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { Nav, NavDropdown } from 'react-bootstrap';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <header>
        {/* Top strip */}
        <div className="bg-light py-1 border-bottom d-none d-md-block">
          <Container className="d-flex justify-content-between small">
            <div>
              📞 We are available 24/7, Need help?{" "}
              <strong className="text-success">+965 505 31291</strong>
            </div>
            <div>
              <a href="/aboutus" className="me-3">
                About Us
              </a>
              <a href="/contactus" className="me-3">
                Contact Us
              </a>
              <a href="#account" className="me-3">
                My Account
              </a>
              <a href="/login">Login</a>
            </div>
          </Container>
        </div>

        {/* Navbar */}
        <Navbar
          expand="lg"
          bg="info"
          variant="dark"
          sticky="top"
          className="py-3"
        >
          <Container fluid>
            {/* Brand */}
            <Navbar.Brand href="/" className="fw-bold">
              <img
                src="/image/logo.png"
                alt="Acha Bazar Logo"
                className="d-inline-block align-top me-2 w-25"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              {/* Search Bar */}
              <Form className="d-flex flex-grow-1 mx-lg-3 my-3 my-lg-0">
                <FormControl
                  type="search"
                  placeholder="Search for products (e.g. fish, apple, oil)"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="light">
                  <i className="bi bi-search"></i>
                </Button>
              </Form>

              {/* Nav links */}
              <Nav className="ms-auto align-items-center">
                {/* Dropdown */}
                <NavDropdown title="Categories" id="categories-dropdown">
                  <NavDropdown.Item href="#cat1">Fruits</NavDropdown.Item>
                  <NavDropdown.Item href="#cat2">Vegetables</NavDropdown.Item>
                  <NavDropdown.Item href="#cat3">Meat</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/aboutus">About Us</Nav.Link>
                <Nav.Link href="/contactus">Contact Us</Nav.Link>
                <NavDropdown title="Pages" id="pages-dropdown">
                  <NavDropdown.Item href="#offers">Offers</NavDropdown.Item>
                  <NavDropdown.Item href="/privacypolicy">
                    Privacy Policy
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/termsandconditions">
                    Terms & Conditions
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Mobile Specific Icons */}
                {/* <div className="d-flex d-lg-none align-items-center mt-3 mt-lg-0 w-100 justify-content-around border-top pt-3">
                  <div>
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    <span>Select delivery location</span>
                  </div>
                  <div>
                    <i className="bi bi-person fs-5 me-3"></i>
                    <i className="bi bi-cart fs-5"></i>
                  </div>
                </div> */}

                {/* Desktop Icons */}
                <Nav.Link className="d-none d-lg-block">
                  <i className="bi bi-bell fs-5"></i>
                </Nav.Link>
                <Nav.Link className="d-none d-lg-block position-relative">
                  <i className="bi bi-cart fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0
                  </span>
                </Nav.Link>
                <Nav className="ms-auto">
                  <NavDropdown
                    title={<i className="bi bi-person fs-5"></i>}
                    id="profile-dropdown"
                    align="end"
                    className="d-none d-lg-block"
                  >
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">signup</NavDropdown.Item>
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
