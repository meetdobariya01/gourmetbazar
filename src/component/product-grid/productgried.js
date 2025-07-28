import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const API_BASE = 'http://localhost:5000';

const ProductGrid = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      fetchFoods();
    } else {
      fetch(`${API_BASE}/foods/${selectedCategory}`)
        .then(res => res.json())
        .then(setFoods)
        .catch(console.error);
    }
  }, [selectedCategory]);

  const fetchFoods = () => {
    fetch(`${API_BASE}/foods`)
      .then(res => res.json())
      .then(setFoods)
      .catch(console.error);
  };

  const fetchCategories = () => {
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  };

  const handleViewProduct = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = '/product';
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>OUR Product</h2>
        <Form.Select
          style={{ width: '200px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        {foods.map((food) => (
          <Col key={food._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={
                  food.Photos
                    ? `${API_BASE}${food.Photos}`
                    : "https://via.placeholder.com/150"
                }

                onClick={() => handleViewProduct(food)}
                style={{ cursor: 'pointer', height: '160px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{food.FoodName}</Card.Title>
                <Card.Text>₹{food.FoodPrice}</Card.Text>
                <Button variant="primary" onClick={() => handleViewProduct(food)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
