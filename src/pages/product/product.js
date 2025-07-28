import React, { useState } from "react";
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

const product = {
  name: "Calabaza Squash",
  price: 98.03,
  stock: 579,
  category: "fresh-vegetable",
  description: `Most fresh vegetables are low in calories and have a water content in excess of 70 percent, 
  with only about 3.5 percent protein and less than 1 percent fat. The root vegetables include beets, 
  carrots, radishes, sweet potatoes.`,
  image: "image/apple.jpg", // sample squash image
  phone: "+0044235234",
  tags: ["fresh fruits", "fruits", "vegetable"],
};

export const Product = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <Header />
      <Container className="my-4">
        <Row>
          {/* Left Side Image */}
          <Col md={6} xs={12} className="text-center mb-3">
            <img src={product.image} alt={product.name} className="img-fluid w-75" />
          </Col>

          {/* Right Side Details */}
          <Col md={6} xs={12}>
            <h4 className="fw-bold">{product.name}</h4>
            <p>
              SKU: <Badge bg="success">Stock : {product.stock}</Badge>
            </p>
            <h5 className="text-danger">${product.price.toFixed(2)}</h5>
            <p>
              {product.description}{" "}
              <span className="text-primary" role="button">
                More Info
              </span>
            </p>

            {/* Quantity & Cart */}
            <div className="d-flex align-items-center mb-3">
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
              <Button variant="dark" className="ms-3 px-4">
                Add to Cart
              </Button>
            </div>

            <p>
              <strong>Category:</strong>{" "}
              <a href="#" className="text-decoration-underline">
                {product.category}
              </a>
            </p>

            {/* Tags */}
            <div className="mb-3">
              {product.tags.map((tag) => (
                <Badge bg="light" text="dark" className="me-2 mb-1" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>

            <p>
              Call Us To Order By Mobile Number:{" "}
              <span className="text-success fw-bold">{product.phone}</span>
            </p>

            <div>
              <strong>Share your social network</strong>
              <p className="text-muted small">
                For get lots of traffic from social network share this product
              </p>
              <div className="d-flex gap-2 fs-5">
                <FaFacebook style={{ color: "#3b5998" }} />
                <FaTwitter style={{ color: "#00acee" }} />
                <FaReddit style={{ color: "#ff4500" }} />
                <FaWhatsapp style={{ color: "#25D366" }} />
                <FaLinkedin style={{ color: "#0077b5" }} />
              </div>
            </div>
          </Col>
        </Row>

        {/* Sidebar-like section under for mobile */}
        <Row className="mt-5">
          <Col xs={12} md={8} className="mx-auto">
            <div className="border rounded p-3 bg-light">
              <p>🚚 Free shipping applies to all orders over €100</p>
              <p>🏠 Home Delivery within 1 Hour</p>
              <p>💰 Cash on Delivery Available</p>
              <p>🔄 7 Days returns money back guarantee</p>
              <p>❌ Warranty not available for this item</p>
              <p>🌱 Guaranteed 100% organic from natural products.</p>
              <p>
                📍 Delivery from our pick point Boho One, Bridge Street West,
                Middlesbrough, North Yorkshire, TS2 1AE.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default Product;
