import React from "react";
import Header from "../../component/header/header";
// import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../component/footer/footer";

export const Contactus = () => {
  return (
    <div>
      <Header />
      {/* banner-section */}
      <div className="position-relative text-center py-5 bg-light">
        {/* Left Image */}
        <img
          src="/image/b-1.png"
          alt="Fruits Left"
          className="position-absolute top-0 start-0 img-fluid d-none d-md-block"
          style={{ maxHeight: "100%", maxWidth: "30%" }}
        />

        {/* Right Image */}
        <img
          src="/image/b-2.png"
          alt="Groceries Right"
          className="position-absolute top-0 end-0 img-fluid d-none d-md-block"
          style={{ maxHeight: "100%", maxWidth: "50%" }}
        />

        {/* Title */}
        <h1 className="fw-bold text-dark z-1 position-relative">Contact Us</h1>
      </div>
      {/* // contact-us-address// */}
      <Container className="py-5">
        <Row className="g-4 text-center">
          {/* Email */}
          <Col xs={12} md={4}>
            <div className="p-4 border rounded h-100">
              <FaEnvelope size={32} className="text-success mb-3" />
              <h5>
                <strong>Email Us</strong>
              </h5>
              <p className="mb-1 text-success">info@kachabazar.com</p>
              <p>
                We’re here to help you with any questions or support you need.
              </p>
            </div>
          </Col>

          {/* Call */}
          <Col xs={12} md={4}>
            <div className="p-4 border rounded h-100">
              <FaPhoneAlt size={32} className="text-success mb-3" />
              <h5>
                <strong>Call Us</strong>
              </h5>
              <p className="mb-1 text-success">029-00124667</p>
              <p>Call us anytime between 9AM to 9PM, 7 days a week.</p>
            </div>
          </Col>

          {/* Location */}
          <Col xs={12} md={4}>
            <div className="p-4 border rounded h-100">
              <FaMapMarkerAlt size={32} className="text-success mb-3" />
              <h5>
                <strong>Location</strong>
              </h5>
              <p className="mb-1">
                Boho One, Bridge Street West,
                <br /> Middlesbrough, North Yorkshire, TS2 1AE.
              </p>
              <p>561-4535 Nulla LA, United States 96522.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* contact form */}

      <Container className="py-5">
        <Row className="align-items-center">
          {/* Left Image Section */}
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <img
              src="/image/contact.jpeg" // ✅ Put your image in public folder
              alt="Contact Support"
              className="img-fluid"
            />
          </Col>

          {/* Right Form Section */}
          <Col xs={12} md={6}>
            <h2 className="mb-3 fw-bold">
              For any support just send your query
            </h2>
            <p className="mb-4 text-muted">
              We’re here to help. Fill out the form and our team will get back
              to you shortly.
            </p>
            <Form>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Subject" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here"
                />
              </Form.Group>

              <Button variant="success" type="submit" className="px-4">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
      {/* End Footer */}

    </div>
  );
};
export default Contactus;
