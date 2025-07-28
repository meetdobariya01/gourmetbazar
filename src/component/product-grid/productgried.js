import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const API_BASE = 'http://localhost:5000';
const TOKEN = localStorage.getItem('token');

const Productgried = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foods, setFoods] = useState([]);
  const [vegFoods, setVegFoods] = useState([]);

  useEffect(() => {
    loadCategories();
    loadFoods();
  }, []);

  useEffect(() => {
    loadFoods(selectedCategory);
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadFoods = async (category = 'All') => {
    try {
      const url = category === 'All' ? `${API_BASE}/foods` : `${API_BASE}/foods/${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setFoods(data);
      setVegFoods([]); // clear type filter
    } catch (err) {
      console.error('Error loading foods:', err);
    }
  };

  const filterByType = async (type) => {
    try {
      const res = await fetch(`${API_BASE}/foods/type/${type}`);
      const data = await res.json();
      setVegFoods(data.foods || []);
    } catch (err) {
      console.error('Error fetching type foods:', err);
    }
  };

  const addToCart = async (foodId) => {
    if (!TOKEN) {
      alert('Please log in to add items.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ foodId, quantity: 1 }),
      });
      const data = await res.json();
      alert(res.ok ? '✅ Added to cart!' : `❌ ${data.message || 'Failed to add.'}`);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const renderFoodCard = (food) => {
    const imgSrc = food.image?.startsWith('http')
      ? food.image
      : food.image || 'https://via.placeholder.com/240x160?text=No+Image';

    return (
      <Col key={food._id} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className="h-100 shadow-sm">
          <Card.Img
            variant="top"
            src={imgSrc}
            alt={food.name}
            style={{ height: '160px', objectFit: 'cover' }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/240x160?text=No+Image')}
          />
          <Card.Body className="text-center">
            <Card.Title>{food.name}</Card.Title>
            <Card.Text>{food.description}</Card.Text>
            <Card.Text><strong>₹{food.price}</strong></Card.Text>
            <Card.Text><span className="badge bg-secondary">{food.category}</span></Card.Text>
            <Card.Text>{food.type}</Card.Text>
            <Button variant="success" onClick={() => addToCart(food._id)}>
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h2>🍲 All Food Items</h2>
        <p>Browse & filter foods from your MongoDB database.</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <Button variant="outline-success" className="me-2" onClick={() => filterByType('Veg')}>
            Veg
          </Button>
          <Button variant="outline-danger" onClick={() => filterByType('Non-Veg')}>
            Non-Veg
          </Button>
        </div>

        <Form.Select
          className="w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        {(vegFoods.length > 0 ? vegFoods : foods).map(renderFoodCard)}
      </Row>
    </Container>
  );
};

export default Productgried;
