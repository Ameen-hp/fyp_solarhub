import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTrash, FaSearch } from 'react-icons/fa';

const UserQueries = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQueries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user-queries');
      setQueries(response.data);
      setFilteredQueries(response.data);
    } catch (error) {
      setError('⚠️ Failed to fetch queries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = queries.filter((query) =>
      query.name.toLowerCase().includes(value) ||
      query.email.toLowerCase().includes(value) ||
      query.message.toLowerCase().includes(value)
    );
    setFilteredQueries(filtered);
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/user-queries/confirm/${id}`);
      alert('✅ Query confirmed and email sent!');
      fetchQueries();
    } catch (error) {
      alert('❌ Error confirming query.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user-queries/${id}`);
      alert('🗑️ Query deleted.');
      fetchQueries();
    } catch (error) {
      alert('❌ Error deleting query.');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading queries...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-6 text-xl">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">🛠️ User Queries </h1>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-8">
        <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, message..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Queries List */}
      {filteredQueries.length === 0 ? (
        <p className="text-center text-gray-500">No queries found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQueries.map((query) => (
            <div
              key={query._id}
              className="bg-white border border-blue-100 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">{query.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {query.email}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Problem:</span> {query.message}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    query.confirmed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {query.confirmed ? 'Confirmed' : 'Pending'}
                </span>
              </p>

              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={() => handleConfirm(query._id)}
                  disabled={query.confirmed}
                  className={`flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded transition ${
                    query.confirmed ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <FaCheckCircle /> {query.confirmed ? 'Confirmed' : 'Confirm'}
                </button>
                <button
                  onClick={() => handleDelete(query._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserQueries;
