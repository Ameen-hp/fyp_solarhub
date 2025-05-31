import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaCheckCircle, FaTrash } from 'react-icons/fa';

const PackageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packageOrders');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      setError('⚠️ Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = orders.filter((order) =>
      order.fullName.toLowerCase().includes(value) ||
      order.email.toLowerCase().includes(value) ||
      order.phone.toLowerCase().includes(value) ||
      order.deliveryAddress.toLowerCase().includes(value)
    );
    setFilteredOrders(filtered);
  };

  const handleConfirm = async (orderId) => {
    try {
      await axios.post(`http://localhost:5000/api/packageOrder/confirm/${orderId}`);
      alert('✅ Order confirmed and email sent.');
      fetchOrders();
    } catch (error) {
      alert('❌ Error confirming order.');
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/packageOrder/${orderId}`);
      alert('🗑️ Order deleted.');
      fetchOrders();
    } catch (error) {
      alert('❌ Error deleting order.');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading orders...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-6 text-xl">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">📦 Solar Package Orders</h1>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-8">
        <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, phone..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-blue-100 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">{order.packageName}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Price:</span> {order.packagePrice}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Full Name:</span> {order.fullName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {order.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Phone:</span> {order.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={() => handleConfirm(order._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded transition"
                >
                  <FaCheckCircle /> Confirm
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
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

export default PackageOrder;
