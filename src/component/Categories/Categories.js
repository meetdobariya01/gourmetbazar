import React from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  {
    title: "Pet Care",
    icon: "🐱",
    subcategories: ["Dog Care", "Cat Care"],
    path: "/pet-care",
  },
  {
    title: "Beauty & Healths",
    icon: "💄",
    subcategories: ["Women", "Men"],
    path: "/beauty-health",
  },
  {
    title: "Jam & Jelly",
    icon: "🍓",
    subcategories: [],
    path: "/jam-jelly",
  },
  {
    title: "Drinks",
    icon: "🥤",
    subcategories: ["Tea", "Water", "Juice"],
    path: "/drinks",
  },
  {
    title: "Fish & Meat",
    icon: "🐟",
    subcategories: ["Fish", "Meat"],
    path: "/fish-meat",
  },
  {
    title: "Cooking",
    icon: "🍳",
    subcategories: ["Flour"],
    path: "/cooking",
  },
  {
    title: "Biscuits & Cake",
    icon: "🍪",
    subcategories: ["Biscuits", "Cakes"],
    path: "/biscuits-cake",
  },
  {
    title: "Breakfast",
    icon: "🍩",
    subcategories: ["Bread", "Cereal"],
    path: "/breakfast",
  },
];
export const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div>
      <div className="container my-5">
        <h3 className="text-center fw-bold">Featured Categories</h3>
        <p className="text-center text-muted mb-4">
          Choose your necessary products from this feature categories.
        </p>
        <div className="row g-3">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div
                className="border rounded text-center p-3 h-100 shadow-sm bg-white hover-shadow"
                role="button"
                onClick={() => handleClick(cat.path)}
              >
                <div className="fs-1 mb-2">{cat.icon}</div>
                <h6 className="fw-bold">{cat.title}</h6>
                <ul className="list-unstyled text-muted small">
                  {cat.subcategories.map((sub, i) => (
                    <li key={i}>› {sub}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Categories;
