import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const products = [
  {
    id: 1,
    title: "Brown Rolling Paper",
    price: 89,
    image: "image/chili.jpg",
  },
  {
    id: 2,
    title: "Cigarette Holder by LIT",
    price: 599,
    image: "image/tometo.jpg",
  },
  {
    id: 3,
    title: "Herb Storage Container",
    price: 400,
    image: "image/ladies-finger.jpg",
  },
  {
    id: 4,
    title: "Herb Storage Container",
    price: 400,
    image: "image/ladies-finger.jpg",
  },
];
export const Categories = () => {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleShow = (img) => {
    setSelectedImg(img);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
{/* header import */}
      <Header />
      <Container className="py-4">
        <Row xs={2} sm={3} md={4} className="g-3">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShow(product.image)}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {product.title}
                  </Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <Button variant="success" size="sm">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="p-0">
            <img src={selectedImg} alt="Product" className="img-fluid w-100" />
          </Modal.Body>
        </Modal>
      </Container>
      {/* footer import */}
      <Footer/>
    </div>
  );
};
export default Categories;
