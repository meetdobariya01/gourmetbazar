
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';

const API_BASE_URL = "http://localhost:5000";

const OtpSignupForm = () => {

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
                role:'User',
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

};;


export default OtpSignupForm;
