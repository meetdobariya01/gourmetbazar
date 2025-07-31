import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "../../index.css"; // Custom CSS for animation
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const API_BASE = "http://localhost:5000";


const SearchResults = () => {
 const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState(
    new URLSearchParams(location.search).get("query") || ""
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then(setResults)
        .catch((err) => console.error("Search error:", err));
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };


    return (
      <div>
        {/* header import */}
        <Header />
        <Container className="my-5">
          <Form className="search-form mb-4" onSubmit={handleSearch}>
            <div className="search-bar-wrapper">
              <FormControl
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for food..."
                className="animated-search"
              />
              <Button type="submit" variant="dark">
                Search
              </Button>
            </div>
          </Form>

          <h4 className="mb-4">
            Search Results for: <strong>{searchInput}</strong>
          </h4>
          <Row>
            {results.length > 0 ? (
              results.map((item) => (
                <Col md={4} key={item._id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={
                        item.Photos
                          ? `${API_BASE}${item.Photos}`
                          : "https://via.placeholder.com/150"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{item.FoodName}</Card.Title>
                      <Card.Text>{item.Description}</Card.Text>
                      <h5 className="text-success">₹{item.FoodPrice}</h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </Row>
        </Container>

        {/* footer */}
        <Footer />
      </div>
    );
  };


export default SearchResults;
