import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import "../../index.css";

const slides = [
  {
    title: "Best Different Type of Grocery Store",
    description: "Quickly aggregate empowered networks after emerging products...",
    button: "Shop Now",
    image: "/image/carousel-1.jpg",
  },
  {
    title: "Fresh Fruits & Vegetables",
    description: "Freshness delivered to your doorstep.",
    button: "Order Now",
    image: "/image/carousel-2.jpg",
  },
  {
    title: "Organic and Healthy Choices",
    description: "Explore healthy grocery options with us.",
    button: "Explore More",
    image: "/image/carousel-3.jpg",
  },
];
export const HeroCarousel = () => {
  return (
    <div>
      <Carousel fade interval={4000} controls={false} indicators className="hero-carousel">
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <div
            className="carousel-bg d-flex align-items-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <Container className="carousel-content text-start text-white">
              <h1 className="fw-bold mb-3">{slide.title}</h1>
              <p className="lead mb-4">{slide.description}</p>
              <Button variant="success" size="lg" className="rounded">
                {slide.button}
              </Button>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
};
export default HeroCarousel;
