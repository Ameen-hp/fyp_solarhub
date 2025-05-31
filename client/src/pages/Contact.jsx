import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // Loading state
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userQuery = { name, email, message };

    setIsSubmitting(true);  // Start loading

    try {
      const res = await fetch('http://localhost:5000/api/user-queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userQuery),
      });

      if (res.ok) {
        alert('✅ Your query has been submitted.');
        setName('');
        setEmail('');
        setMessage('');
        setError(null); // Reset error on successful submission
        navigate('/user-query'); // Optional: redirect to query page
      } else {
        const data = await res.json();
        setError(data.message || '❌ Failed to submit your query.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('❌ Something went wrong.');
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="w-[500px] bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-blue-600 font-semibold">Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-600 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-600 font-semibold">Message</label>
            <textarea
              className="w-full p-3 border rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-300`}
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
