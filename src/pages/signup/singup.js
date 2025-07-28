import React, { useState } from "react";
import axios from "axios";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const API_BASE_URL = "http://localhost:5000"; // backend port

const OtpSignupForm = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const inputStyle = {
    display: "block",
    marginBottom: "12px",
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "5px",
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/send-otp`, { mobile });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/verify-otp`, {
        mobile,
        Otp: otp,
      });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, {
        ...formData,
        role: formData.role?.toLowerCase() || "user",
        mobile,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div>
      {/* Header Component */}
      <Header />

      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          User Signup
        </h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleSendOtp} style={buttonStyle}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleVerifyOtp} style={buttonStyle}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Role (optional)"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              style={inputStyle}
            />
            <button onClick={handleSignup} style={buttonStyle}>
              Sign Up
            </button>
          </>
        )}

        {message && (
          <p style={{ marginTop: "20px", color: "#007BFF" }}>{message}</p>
        )}
      </div>

      {/* Footer can be added here if needed */}
      <Footer/>
    </div>
  );
};

export default OtpSignupForm;
