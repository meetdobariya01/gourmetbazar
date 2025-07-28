<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
=======
import React, { useState } from "react";
import axios from "axios";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
>>>>>>> af234cffda1ab128399543a76bdcaad72a32c08f

const API_BASE_URL = "http://localhost:5000";

const OtpSignupForm = () => {
<<<<<<< HEAD
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        mobile: '',
        role: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSendOtp = async () => {
        setMessage('');
        setIsLoading(true);
        try {
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                setMessage("Please enter a valid email address.");
                setIsLoading(false);
                return;
            }

            const res = await axios.post(`${API_BASE_URL}/send-otp-email`, { email });
            setMessage(res.data.message);
            setStep(2);
            setFormData(prevData => ({ ...prevData, email }));
        } catch (err) {
            setMessage(err.response?.data?.message || "Error sending OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setMessage('');
        setIsLoading(true);
        try {
            if (!otp || !/^\d{6}$/.test(otp)) {
                setMessage("Please enter a 6-digit OTP.");
                setIsLoading(false);
                return;
            }

            const res = await axios.post(`${API_BASE_URL}/verify-otp-email`, { email, Otp: otp });
            setMessage(res.data.message);
            setStep(3);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error verifying OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async () => {
        setMessage('');
        setIsLoading(true);
        try {
            if (!formData.fname || !formData.lname || !formData.email || !formData.password || !formData.mobile) {
                setMessage("Please fill in all required fields.");
                setIsLoading(false);
                return;
            }
            if (formData.password.length < 6) {
                setMessage("Password must be at least 6 characters long.");
                setIsLoading(false);
                return;
            }
            if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
                setMessage("Please enter a valid 10-digit Indian mobile number.");
                setIsLoading(false);
                return;
            }

            const res = await axios.post(`${API_BASE_URL}/signup`, {
                ...formData,
                role: formData.role?.toLowerCase() || 'user',
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
        <div className="container mt-5 p-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">User Signup</h2>

                    {step === 1 && (
                        <>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                className="btn btn-success w-100"
                                onClick={handleSendOtp}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP to Email'}
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    className="form-control"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleVerifyOtp}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                            </button>
                            <button
                                className="btn btn-link w-100 mt-2"
                                onClick={() => {
                                    setStep(1);
                                    setMessage('');
                                    setOtp('');
                                }}
                                disabled={isLoading}
                            >
                                Change Email Address
                            </button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="First Name"
                                    className="form-control"
                                    value={formData.fname}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="lname"
                                    placeholder="Last Name"
                                    className="form-control"
                                    value={formData.lname}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={formData.email}
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    className="form-control"
                                    value={formData.mobile}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role (optional)"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </>
                    )}

                    {message && (
                        <div className={`alert mt-4 ${message.toLowerCase().includes('error') || message.toLowerCase().includes('fail') ? 'alert-danger' : 'alert-info'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
=======
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
>>>>>>> af234cffda1ab128399543a76bdcaad72a32c08f
};

export default OtpSignupForm;
