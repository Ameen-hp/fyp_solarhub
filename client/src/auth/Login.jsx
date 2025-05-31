import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Updated import


import { useAuth } from "../context/AuthContext"; // Import AuthContext

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login from AuthContext

  // 🔐 Redirect if already logged in and token is valid
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          navigate('/');
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { email, password } = form;

    if (!email || !password) {
      setMessage('❌ Both email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Decode the token to get user info (role and name)
      const decoded = jwtDecode(data.token);
      login(decoded.role, decoded.name); // Set role and name in AuthContext

      setMessage('✅ Login successful!');
      setIsLoading(false);
      setTimeout(() => navigate('/'), 1500); // quicker redirect
    } catch (error) {
      console.error('Login Error:', error);
      setMessage(`❌ ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/30 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md hover:scale-[1.02] transform transition-all duration-500">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">SolarHub Login</h2>

        {message && (
          <p
            className={`mb-4 text-sm text-center font-medium ${
              message.includes('✅') ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Signup?
          </Link>
        </p>
      </div>
    </div>
  );
}
