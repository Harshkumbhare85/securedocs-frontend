import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config/baseURL';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    console.log("📦 Sending signup request:", form); // 🔍 DEBUG: Log form data

    try {
      const res = await axios.post(`${baseUrl}/api/auth/signup`, form);
      console.log("✅ Signup success. Received token:", res.data.token); // ✅ DEBUG

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("❌ Signup error:", err); // ❌ DEBUG: Full error
      console.log("📩 Error response:", err.response); // ❌ DEBUG: Response details

      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Signup failed';

      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Create SecureDocs Account
        </h1>

        <form onSubmit={handleSignup}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
