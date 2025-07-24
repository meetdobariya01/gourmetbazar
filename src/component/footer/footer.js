import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import "../../index.css";

export const Footer = () => {
  return (
    <div>
      <footer className="footer bg-light text-dark pt-5">
        <Container>
          {/* Top Info Bar */}
          <Row className="text-center text-md-start border-bottom pb-4 mb-4">
            <Col md={3}>
              <p>🚚 Free Shipping From €500.00</p>
            </Col>
            <Col md={3}>
              <p>📞 Support 24/7 At Anytime</p>
            </Col>
            <Col md={3}>
              <p>🛡️ Secure Payment Totally Safe</p>
            </Col>
            <Col md={3}>
              <p>🎁 Latest Offer Upto 20% Off</p>
            </Col>
          </Row>

          {/* Main Footer */}
          <Row className="text-start text-md-start">
            {/* Company */}
            <Col xs={6} md={3} className="mb-4">
              <h6>Company</h6>
              <ul className="footer-links">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Careers</li>
                <li>Latest News</li>
              </ul>
            </Col>

            {/* Latest News */}
            <Col xs={6} md={3} className="mb-4">
              <h6>Latest News</h6>
              <ul className="footer-links">
                <li>Fish & Meat</li>
                <li>Soft Drink</li>
                <li>Milk & Dairy</li>
                <li>Beauty & Health</li>
              </ul>
            </Col>

            {/* My Account */}
            <Col xs={6} md={3} className="mb-4">
              <h6>My Account</h6>
              <ul className="footer-links">
                <li>Dashboard</li>
                <li>My Orders</li>
                <li>Recent Orders</li>
                <li>Update Profile</li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col xs={12} md={3} className="mb-4">
              <h5 className="fw-bold mb-2">
                <img
                  src="/image/logo.png"
                  alt="logo"
                  style={{ height: "50px", marginRight: "8px" }}
                />
                {/* KACHA <span className="text-success">BAZAR</span> */}
              </h5>
              <address>
                A-211 Silver Square Opp.<br />
                 Bagban Party Plot Ahmedabad,<br/>
                  Gujarat 380059,<br/>
                   {/* IN Email:{" "} */}
                {/* <a href="mailto:ccruidk@test.com">ccruidk@test.com</a> */}
              </address>
            </Col>
          </Row>

          {/* Social & Payments */}
          <Row className="justify-content-between align-items-center border-top pt-4 mt-4">
            <Col
              xs={12}
              md={4}
              className="text-center text-md-start mb-3 mb-md-0"
            >
              <h6>Follow Us</h6>
              <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5">
                <FaFacebookF />
                <FaTwitter />
                <FaPinterestP />
                <FaLinkedinIn />
                <FaWhatsapp />
              </div>
            </Col>

            <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
              <h6>Call Us Today!</h6>
              <span className="text-success fw-bold fs-5">+6599887766</span>
            </Col>

            <Col xs={12} md={4} className="text-center text-md-end">
              <img
                src="/image/payment.jpg"
                alt="Payments"
                className="img-fluid"
                style={{ maxHeight: "70px" }}
              />
            </Col>
          </Row>

          {/* Copyright */}
          <Row className="pt-4 mt-4 border-top text-center small">
            <Col>
              <p>
                Copyright 2024 © <a href="#">Gourmetbazar</a>,
                All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};
export default Footer;
