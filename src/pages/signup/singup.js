import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await axios.post('http://localhost:5000/api/user/register', dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMessage(res.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Sign Up</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required /><br />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
