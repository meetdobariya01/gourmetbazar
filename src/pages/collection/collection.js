import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const expensiveProducts = [
  {
    id: 1,
    title: "Aluminum Herb Crusher",
    desc: "1 unit",
    price: 1200,
    image: "image/ladies-finger.jpg",
  },
  {
    id: 2,
    title: "Premium Cigarette Holder",
    desc: "1 piece",
    price: 1800,
    image: "image/ladies-finger.jpg",
  },
  {
    id: 3,
    title: "Luxury Storage Container",
    desc: "1 unit",
    price: 2400,
    image: "image/ladies-finger.jpg",
  },
  {
    id: 4,
    title: "Metallic Herb Grinder",
    desc: "1 piece",
    price: 1999,
    image: "image/ladies-finger.jpg",
  },
];

export const Collection = () => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleShow = (img) => {
    setSelectedImage(img);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  return (
    <div>
      <Container className="py-4">
        <Row xs={2} sm={2} md={3} lg={4} className="g-3">
          {expensiveProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  onClick={() => handleShow(product.image)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {product.title}
                  </Card.Title>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {product.desc}
                  </Card.Text>
                  <h6 className="mb-2">₹{product.price.toLocaleString()}</h6>
                  <Button variant="outline-success" size="sm" className="w-100">
                    ADD
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose} centered animation>
          <Modal.Body className="p-0">
            <img
              src={selectedImage}
              alt="Product"
              className="img-fluid w-100"
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};
export default Collection;
