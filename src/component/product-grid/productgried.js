import React from 'react';
import { Card, Button, Badge, Row, Col, Container } from 'react-bootstrap';


const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: ['T-Shirt', 'Mint', 'Organic Cherry Tomato', 'Lettuce', 'AZERBAIJAN'][i % 5],
  stock: Math.floor(Math.random() * 30000),
  price: (Math.random() * 500).toFixed(2),
  oldPrice: i % 2 === 0 ? ((Math.random() * 500) + 20).toFixed(2) : null,
  discount: i % 3 === 0 ? `${(Math.random() * 15 + 5).toFixed(2)}% Off` : null,
  stockOut: i % 7 === 0,
  image: `https://via.placeholder.com/120x120?text=Product+${i + 1}`
}));
export const Productgried = () => {
  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h3>Popular Products for Daily Shopping</h3>
        <p className="text-muted">
          See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping.
        </p>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm position-relative">
              <Card.Body className="text-center">

                {/* Stock and Discount */}
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg={product.stockOut ? 'danger' : 'success'}>
                    {product.stockOut ? 'Stock Out' : `Stock : ${product.stock}`}
                  </Badge>
                  {product.discount && (
                    <Badge bg="warning" text="dark">{product.discount}</Badge>
                  )}
                </div>

                {/* Image */}
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="mb-3"
                  style={{ height: '100px', objectFit: 'contain' }}
                />

                {/* Name */}
                <Card.Title as="h6">{product.name}</Card.Title>

                {/* Price */}
                <div className="fw-bold">
                  ${product.price}
                  {product.oldPrice && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </Card.Body>

              {/* Add Button */}
              <Button
                variant="success"
                className="rounded-circle position-absolute"
                style={{ bottom: '10px', right: '10px', width: '36px', height: '36px' }}
              >
                +
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Productgried;
