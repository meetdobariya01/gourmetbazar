// src/components/LoginForm.js
import React, { useState } from 'react';
import api from '../api/api';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '', role: '' });
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', form);
            setToken(res.data.token);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <input name="role" placeholder="Role" onChange={handleChange} />
            <button type="submit">Login</button>
            <p>{message}</p>
            {token && <p>Token: {token}</p>}
        </form>
    );
};

export default LoginForm;
