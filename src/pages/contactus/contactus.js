import React, { useState } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Contactus = () => {
  const API_BASE_URL = "http://localhost:5000";

  const [formData, setFormData] = useState({
    YourName: '',
    YourEmail: '',
    Subject: '',
    Message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/contectus`, formData);
      setResponseMessage(res.data.message);
      setFormData({ YourName: '', YourEmail: '', Subject: '', Message: '' });
    } catch (error) {
      console.error(error);
      setResponseMessage(error.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <div>
      <Header />
      {/* Banner */}
      <div className="position-relative text-center py-5 bg-light">
        <img src="/image/b-1.png" alt="Fruits" className="position-absolute top-0 start-0 img-fluid d-none d-md-block" style={{ maxHeight: "100%", maxWidth: "30%" }} />
        <img src="/image/b-2.png" alt="Groceries" className="position-absolute top-0 end-0 img-fluid d-none d-md-block" style={{ maxHeight: "100%", maxWidth: "50%" }} />
        <h1 className="fw-bold text-dark z-1 position-relative">Contact Us</h1>
      </div>

      {/* Contact Info */}
      <Container className="py-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <a href="mailto:info@kachabazar.com" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="p-4 border rounded h-100">
                <FaEnvelope size={32} className="text-success mb-3" />
                <h5><strong>Email Us</strong></h5>
                <p className="mb-1 text-success">info@kachabazar.com</p>
                <p>We’re here to help you with any questions or support you need.</p>
              </div>
            </a>
          </Col>
          <Col md={4}>
            <a href="tel:09099053111" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="p-4 border rounded h-100">
                <FaPhoneAlt size={32} className="text-success mb-3" />
                <h5><strong>Call Us</strong></h5>
                <p className="mb-1 text-success">090990 53111</p>
                <p>Call us anytime between 9 AM to 9 PM, 7 days a week.</p>
              </div>
            </a>
          </Col>
          <Col md={4}>
            <a href="https://www.google.com/maps/search/?api=1&query=Silver+Square+Thaltej" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="p-4 border rounded h-100">
                <FaMapMarkerAlt size={32} className="text-success mb-3" />
                <h5><strong>Location</strong></h5>
                <p>Silver Square A‑211,<br />Thaltej‑Shilaj Rd,<br />Ahmedabad, Gujarat 380059</p>
              </div>
            </a>
          </Col>
        </Row>
      </Container>

      {/* Contact Form */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src="/image/contact.jpeg" alt="Contact Support" className="img-fluid" />
          </Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">For any support just send your query</h2>
            <p className="text-muted mb-4">We’re here to help. Fill out the form and our team will get back to you shortly.</p>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="YourName"
                      value={formData.YourName}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="YourEmail"
                      value={formData.YourEmail}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  placeholder="Enter Subject"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="px-4">
                Send Message
              </Button>
              {responseMessage && (
                <p className="mt-3 text-success">{responseMessage}</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Contactus;
