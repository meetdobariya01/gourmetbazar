import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../../index.css";
import { Link } from "react-router-dom";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Tometos",
      weight: "100gm",
      image: "/image/tometo.jpg", // replace with actual image path
      price: 500,
      quantity: 1,
    },
    {
      id: 2,
      title: "Ladie Finger",
      weight: "100gm",
      image: "/image/ladies-finger.jpg",
      price: 1500,
      quantity: 3,
    },
  ]);

  const [showNote, setShowNote] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const handleQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div>
      {/* Header Section */}
      <Header />

      <div className="container py-5 cart">
        <h5 className="mb-4 fw-bold">Your Cart</h5>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="d-flex mb-4 align-items-center border-bottom pb-3"
          >
            <img
              src={item.image}
              alt={item.title}
              className="img-thumbnail me-3"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <h3 className="mb-1">{item.title}</h3>
              <small className="text-muted">Wt. {item.weight}</small>
              <div className="d-flex align-items-center mt-2">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleQuantity(item.id, -1)}
                >
                  <FaMinus />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleQuantity(item.id, 1)}
                >
                  <FaPlus />
                </button>
                <span className="ms-auto fw-bold">
                  ₹ {item.price * item.quantity}
                </span>
                <button
                  className="btn btn-link text-danger ms-3 p-0"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-center mt-4">
          {/* <button
            className="btn btn-link p-0 text-dark"
            onClick={() => setShowNote(!showNote)}
          >
            {showNote ? "Hide order note" : "Add order note"}
          </button> */}
          <span className="text-muted small">
            Shipping & taxes calculated at checkout
          </span>
        </div>

        {showNote && (
          <div className="mt-3 animate-fade">
            <textarea
              className="form-control mb-2"
              rows="3"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Write your note here..."
            ></textarea>
            <button className="btn btn-outline-dark btn-sm">Submit Note</button>
          </div>
        )}

        <div className="mt-5">
          <Link to="/checkout">
            <button
              className="btn w-100 text-white fw-bold  btn-success"
              variant="outline-success"
            >
              CHECKOUT - MRP ₹ {total}
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};
export default Cart;
