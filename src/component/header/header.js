import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
// import { FaShoppingBag, FaBell, FaShoppingCart, FaUser, FaPhoneAlt } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaBell, FaShoppingCart, FaUser, FaPhone } from "react-icons/fa";

export const Header = () => {
  return (
    <>
      {/* Top bar */}
      <div className="bg-light py-1 border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="small">
            <FaPhone className="me-2 text-muted" />
            We are available 24/7, Need help?{" "}
            <span className="text-success">+965 505 31291</span>
          </div>
          <div className="d-none d-md-flex small gap-3">
            <a href="/aboutus" className="text-decoration-none text-dark">
              About Us
            </a>
            <a href="/contactus" className="text-decoration-none text-dark">
              Contact Us
            </a>
            <a href="#account" className="text-decoration-none text-dark">
              My Account
            </a>
            <a href="#login" className="text-decoration-none text-dark">
              Login
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar bg="info" expand="lg" variant="dark" className="py-3">
        <Navbar.Brand href="/">
          {/* Replace text with logo image */}
          <img
            src="/image/logo.png" // ✅ replace with the correct path to your logo image
            alt="Kacha Bazar Logo"
            // adjust size as needed
            className="d-inline-block w-50 ms-5 align-top me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Form className="d-flex mx-auto my-2 my-lg-0 w-100 max-w-50">
            <FormControl
              type="search"
              placeholder="Search for products (e.g. fish, apple, oil)"
              className="me-2"
            />
          </Form>
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#notifications">
              <FaBell size={18} color="black" />
            </Nav.Link>
            <Nav.Link href="#cart" className="position-relative">
              <FaShoppingCart size={18} color="black" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </Nav.Link>
            <Nav.Link href="#profile">
              <FaUser size={18} color="black" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Lower Navigation */}
      <Navbar bg="white" expand="lg" className="border-top border-bottom py-2">
        <Container>
          <Navbar.Toggle aria-controls="lower-navbar" />
          <Navbar.Collapse id="lower-navbar">
            <Nav className="mx-auto">
              <NavDropdown title="Categories" id="categories-dropdown">
                <NavDropdown.Item href="#category1">
                  Vegetables
                </NavDropdown.Item>
                <NavDropdown.Item href="#category2">Fruits</NavDropdown.Item>
                <NavDropdown.Item href="#category3">Meat</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/aboutus">About Us</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
              <NavDropdown title="Pages" id="pages-dropdown">
                <NavDropdown.Item href="#page1">Shop</NavDropdown.Item>
                <NavDropdown.Item href="#page2">Cart</NavDropdown.Item>
                <NavDropdown.Item href="#page3">Checkout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#offers" className="text-danger">
                Offers{" "}
                <span className="badge bg-light text-danger ms-1">●</span>
              </Nav.Link>
            </Nav>
            <div className="d-flex gap-3 small">
              <a href="#privacy" className="text-decoration-none text-dark">
                Privacy Policy
              </a>
              <a href="#terms" className="text-decoration-none text-dark">
                Terms & Conditions
              </a>
              <span className="d-inline-flex align-items-center">
                <img
                  src="https://flagcdn.com/w40/kw.png"
                  alt="Kuwait Flag"
                  width="20"
                  className="me-1"
                />
              </span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
