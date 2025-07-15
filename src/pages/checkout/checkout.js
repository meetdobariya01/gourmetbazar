import React, { useState } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");

  const handleCardInput = (e) => {
    const input = e.target.value;
    // Allow only digits and limit to 16
    if (/^\d{0,16}$/.test(input)) {
      setCardNumber(input);
    }
  };

  const [expiry, setExpiry] = useState('');

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove non-digits

    if (input.length > 4) input = input.slice(0, 4);

    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }

    setExpiry(input);
  };
  return (
    <div>
      {/* header import */}
      <Header />

      {/* checkout-section */}
      <div className="container py-5">
        <h2 className="mb-4 text-center">Checkout</h2>
        <div className="row">
          {/* Billing Details Form */}
          <div className="col-lg-7 mb-4">
            <h4 className="mb-3">Billing Details</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123 Main Street"
                    required
                  />
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
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5">
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

            {/* Payment Section */}
            <div>
              <h4 className="mb-3">Payment</h4>
              <form>
                {/* Payment Method Dropdown */}
                <div className="mb-3">
                  <label htmlFor="paymentSelect" className="form-label">
                    Select Payment Method
                  </label>
                  <select
                    className="form-select"
                    id="paymentSelect"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="card">Card Payment</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === "card" && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Name on card</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name as on card"
                        required
                      />
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
                          Card number must be 16 digits.
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
                        required
                      />
                    </div>
                  </div>
                )}

                {/* UPI Payment Field */}
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

                {/* COD Info */}
                {paymentMethod === "cod" && (
                  <div className="alert alert-info mt-3">
                    You will pay in cash upon delivery.
                  </div>
                )}

                <button className="btn btn-primary w-100 mt-3" type="submit">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Checkout;
