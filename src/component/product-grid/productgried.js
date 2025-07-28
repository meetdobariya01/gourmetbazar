import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const API_BASE = 'http://localhost:5000';
const TOKEN = localStorage.getItem('token');

const Productgried = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foods, setFoods] = useState([]);
  const [vegFoods, setVegFoods] = useState([]);
  const [error, setError] = useState(null);

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
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        throw new Error('Categories response is not an array');
      }
    } catch (err) {
      console.error('Error loading categories:', err);
      setCategories([]);
    }
  };

  const loadFoods = async (category = 'All') => {
    try {
      const url = category === 'All' ? `${API_BASE}/foods` : `${API_BASE}/foods/${category}`;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setFoods(data);
        setVegFoods([]); // Clear type filter
        setError(null);
      } else {
        throw new Error('Foods response is not an array');
      }
    } catch (err) {
      console.error('Error loading foods:', err);
      setError('⚠️ Failed to load foods.');
    }
  };

  const filterByType = async (type) => {
    try {
      const res = await fetch(`${API_BASE}/foods/type/${type}`);
      const data = await res.json();
      if (Array.isArray(data.foods)) {
        setVegFoods(data.foods);
        setError(null);
      } else {
        throw new Error('Invalid type foods response');
      }
    } catch (err) {
      console.error('Error filtering foods by type:', err);
      setError('⚠️ Failed to filter foods.');
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
    const imgSrc = food.Photos?.startsWith('http')
      ? food.Photos
      : `${API_BASE}/uploads/images/${food.Photos || 'no-image.jpg'}`;

    return (
      <Col key={food._id} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className="h-100 shadow-sm">
          <Card.Img
            variant="top"
            src={imgSrc}
            alt={food.FoodName}
            style={{ height: '160px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${API_BASE}/uploads/images/no-image.jpg`;
            }}
          />
          <Card.Body className="text-center">
            <Card.Title>{food.FoodName}</Card.Title>
            <Card.Text>{food.Description}</Card.Text>
            <Card.Text><strong>₹{food.FoodPrice}</strong></Card.Text>
            <Card.Text><span className="badge bg-secondary">{food.Category}</span></Card.Text>
            <Card.Text>{food.Type}</Card.Text>
            <Button variant="success" onClick={() => addToCart(food._id)}>
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const foodList = vegFoods.length > 0 ? vegFoods : foods;

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
          {Array.isArray(categories) && categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </div>

      {error && <div className="text-danger text-center mb-3">{error}</div>}

      <Row className="g-4">
        {Array.isArray(foodList) && foodList.length > 0
          ? foodList.map(renderFoodCard)
          : <div className="text-center text-muted">No food items found.</div>}
      </Row>
    </Container>
  );
};

export default Productgried;
