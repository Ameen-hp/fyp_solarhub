import React, { useState, useEffect } from 'react'; // ✅ ADD THIS LINE
import * as jwtDecode from 'jwt-decode';

import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading state
  const navigate = useNavigate();

  // 🔐 Redirect if already logged in
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      navigate('/');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { name, email, password, role } = form;

    if (!name || !email || !password) {
      setMessage('❌ All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Handle successful signup
      setMessage('✅ Account created successfully!');
      setIsLoading(false);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      console.error('Signup Error:', error);
      setMessage(`❌ ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/30 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md hover:scale-[1.02] transform transition-all duration-500">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">SolarHub Signup</h2>

        {message && (
          <p
            className={`mb-4 text-sm text-center font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-blue-500" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none hover:border-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-blue-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none hover:border-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-blue-500" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none hover:border-blue-400"
              required
            />
          </div>

          {/* Role */}
          <div className="relative">
            <FaUserTag className="absolute left-3 top-4 text-blue-500" />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none hover:border-blue-400"
            >
              <option value="user">User</option>
              <option value="host">Host</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login?
          </Link>
        </p>
      </div>
    </div>
  );
}
