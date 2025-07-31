import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
<<<<<<< HEAD
import axios from "axios";
=======
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

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
>>>>>>> a7d95d1 (add new file)

export const Collection = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Convert slug to proper category format: "milky-mist-dairy" → "milky mist dairy"
        const formattedCategory = categorySlug.replace(/-/g, " ").toLowerCase();

        const response = await axios.get(
          `http://localhost:5000/products?category=${formattedCategory}`
        );

        setProducts(response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const handleShow = (img) => {
    setSelectedImage(img);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      {/* header import */}
      <Header />

      <Container className="py-4">
        <h4 className="fw-bold text-center mb-4 text-capitalize">
          {categorySlug?.replace(/-/g, " ")} Products
        </h4>

        {products.length === 0 ? (
          <p className="text-center text-muted">No products found in this category.</p>
        ) : (
          <Row xs={2} sm={2} md={3} lg={4} className="g-3">
            {products.map((product) => (
              <Col key={product._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000${product.Photos}`}
                    onClick={() => handleShow(`http://localhost:5000${product.Photos}`)}
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
                      {product.FoodName}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {product.Description}
                    </Card.Text>
                    <h6 className="mb-2">₹{product.FoodPrice.toLocaleString()}</h6>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="w-100"
                    >
                      ADD
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

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

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Collection;
