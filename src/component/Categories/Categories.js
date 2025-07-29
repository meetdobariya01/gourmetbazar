import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories"); // update with real API URL if deployed
      const result = res.data;

      // Optional: if you want to attach paths/icons/subcategories for known categories
      const formatted = result.map((catagory) => ({
        title:catagory,
        icon: "📦", // default icon
        subcategories: [],
        path: `/${catagory.toLowerCase().replace(/\s+/g, '-')}`
      }));

      setCategories(formatted);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container my-5">
      <h3 className="text-center fw-bold">Featured Categories</h3>
      <p className="text-center text-muted mb-4">
        Choose your necessary products from this feature categories.
      </p>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row g-3">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div
                className="border rounded text-center p-3 h-100 shadow-sm bg-white"
                role="button"
                onClick={() => handleClick(cat.path)}
              >
                <div className="fs-1 mb-2">{cat.icon}</div>
                <h6 className="fw-bold">{cat.title}</h6>
                {cat.subcategories?.length > 0 && (
                  <ul className="list-unstyled text-muted small">
                    {cat.subcategories.map((sub, i) => (
                      <li key={i}>› {sub}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
