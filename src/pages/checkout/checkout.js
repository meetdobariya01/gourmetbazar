import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Checkout = () => {
  const API_BASE = "http://localhost:5000"; // Update to production URL if needed
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cartId, setCartId] = useState("");
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInput = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleCardInput = (e) => {
    const input = e.target.value;
    if (/^\d{0,16}$/.test(input)) {
      setCardNumber(input);
    }
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.slice(0, 4);
    if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }
    setExpiry(input);
  };

  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 3) setCvv(input);
  };

  // 👉 Fetch or create the cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to proceed");

      try {
        const res = await fetch(`${API_BASE}/create-cart`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setCartId(data.cartId);
        } else {
          alert(data.message || "Failed to fetch cart.");
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
        alert("Failed to create or fetch cart.");
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    const {
      address, city, zip, firstName, lastName, email, phone
    } = billing;

    if (!address || !city || !zip || !firstName || !lastName ||!phone || !email) {
      return alert("Please fill in all required fields.");
    }

    const addressPayload = {
      houseNumber: address,
      buildingName: billing.state,
      societyName: "",
      road: "",
      landmark: "",
      city,
      pincode: zip,
    };

    try {
      const response = await fetch(`${API_BASE}/place-order/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressPayload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        window.location.href = "/thank-you"; // redirect or show confirmation
      } else {
        alert(data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container py-5"
      >
        <h2 className="mb-4 text-center fw-bold">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-7 mb-4">
              <h4 className="mb-3">Billing Details</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input type="text" className="form-control" required name="firstName" onChange={handleInput} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input type="text" className="form-control" name="lastName" onChange={handleInput} />
                </div>
                <div className="col-12 mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" required name="email" onChange={handleInput} />
                </div>
                <div className="col-12 mb-3">
                  <label>Phone</label>
                  <input type="tel" className="form-control" required name="phone" onChange={handleInput} />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input type="text" className="form-control" required name="address" onChange={handleInput} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <input type="text" className="form-control" required name="city" onChange={handleInput} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>State</label>
                  <input type="text" className="form-control" name="state" onChange={handleInput} />
                </div>
                <div className="col-md-2 mb-3">
                  <label>Zip</label>
                  <input type="text" className="form-control" required name="zip" onChange={handleInput} />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <h4 className="mb-3">Payment</h4>
              <div className="mb-3">
                <label>Payment Method</label>
                <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="card">Card Payment</option>
                  <option value="upi">UPI</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {paymentMethod === "card" && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Name on Card</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumber}
                      onChange={handleCardInput}
                      required
                    />
                    {cardNumber.length > 0 && cardNumber.length < 16 && (
                      <small className="text-danger">Card number must be 16 digits</small>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mb-3">
                  <label>UPI ID</label>
                  <input type="text" className="form-control" placeholder="yourname@bank" required />
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="alert alert-info mt-3">You will pay in cash upon delivery.</div>
              )}

              <motion.button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Place Order
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Checkout;
