import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaPlus,
  FaMinus,
  FaFacebook,
  FaTwitter,
  FaReddit,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
const API_BASE = "http://localhost:5000"; // Add this at the top of the file

const Product = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem("selectedProduct");
    if (data) setProduct(JSON.parse(data));
  }, []);

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h4>No product selected</h4>
        <a href="/product-grid">← Go Back</a>
      </Container>
    );
  }

  return (
    <div>
      <Header />
      <Container className="my-4">
        <Row>
          <Col md={6} className="text-center mb-3">
            <img
           src={
                  product.Photos
                    ? `${API_BASE}${product.Photos}`
                    : "https://via.placeholder.com/150"
                }
              alt={product.FoodName}
              className="img-fluid w-75"
            />
          </Col>

          <Col md={6}>
            <h4 className="fw-bold">{product.FoodName}</h4>
            <Badge bg="info">{product.Category}</Badge>
            <h5 className="text-danger mt-2">₹{product.FoodPrice}</h5>
            <p>{product.Description}</p>

            <div className="d-flex align-items-center my-3">
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              >
                <FaMinus />
              </Button>
              <span className="px-3">{quantity}</span>
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <FaPlus />
              </Button>
              <Button variant="dark" className="ms-3">
                Add to Cart
              </Button>
            </div>

            <div className="mt-4">
              <strong>Share:</strong>
              <div className="d-flex gap-2 fs-5 mt-2">
                <FaFacebook color="#3b5998" />
                <FaTwitter color="#00acee" />
                <FaReddit color="#ff4500" />
                <FaWhatsapp color="#25D366" />
                <FaLinkedin color="#0077b5" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Product;
