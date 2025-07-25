import React, { useState } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

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
  const [cvv, setCvv] = useState("");

  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (input.length <= 3) {
      setCvv(input);
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
        <div className="row">
          {/* Billing Details */}
          <motion.div
            className="col-lg-7 mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="mb-3">Billing Details</h4>
            <form className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-12 mb-3">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="col-12 mb-3">
                <label>Phone</label>
                <input type="tel" className="form-control" required />
              </div>
              <div className="col-12 mb-3">
                <label>Address</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6 mb-3">
                <label>City</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-4 mb-3">
                <label>State</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-2 mb-3">
                <label>Zip</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-12 mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sameAddress"
                />
                <label className="form-check-label" htmlFor="sameAddress">
                  Shipping address is same as billing
                </label>
              </div>
            </form>
          </motion.div>

          {/* Order Summary & Payment */}
          <motion.div
            className="col-lg-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-3">Your Order</h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <h6 className="my-0">Product 1</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$50</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <h6 className="my-0">Product 2</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$30</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$80</strong>
              </li>
            </ul>

            {/* Payment */}
            <div>
              <h4 className="mb-3">Payment</h4>
              <form>
                <div className="mb-3">
                  <label>Select Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
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
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={cardNumber}
                        onChange={handleCardInput}
                        required
                      />
                      {cardNumber.length > 0 && cardNumber.length < 16 && (
                        <small className="text-danger">
                          Card number must be 16 digits
                        </small>
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="yourname@bank"
                      required
                    />
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="alert alert-info mt-3">
                    You will pay in cash upon delivery.
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Place Order
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Checkout;
