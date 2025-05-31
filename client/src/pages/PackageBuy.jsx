import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PackageBuy = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryAddress: '',
    contactNumber: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/packageOrderInfor/${id}`);
        const data = await response.json();
        console.log('Fetched Package:', data);
        setPackageData(data);
      } catch (error) {
        console.error('Failed to fetch package data', error);
      }
    };

    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullData = {
      ...formData,
      packageId: id,
      packageName: packageData?.PackageName,
      packagePrice: packageData?.price,
    };

    try {
      const response = await fetch('http://localhost:5000/api/packageOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });

      if (response.ok) {
        alert('🎉 Order submitted successfully! We will contact you shortly.');
      } else {
        alert('Error in order submission. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error in order submission. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Buy Solar Package</h2>

        {!packageData ? (
          <p className="text-center text-gray-500">Loading package details...</p>
        ) : (
          <>
            {/* Selected Package Heading */}
            <h3 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Selected Package: {packageData.name}
            </h3>

            {/* Optional Image */}
            {packageData.image && (
              <img
                src={packageData.image}
                alt={packageData.name}
                className="w-full max-h-64 object-cover rounded-xl mb-4"
              />
            )}

            {/* Summary Box */}
            <div className="bg-green-50 p-5 rounded-xl mb-6 border-l-4 border-green-500 shadow-inner">
              <p><strong>Package ID:</strong> {packageData.id}</p>
              <p><strong>Name:</strong> {packageData.PackageName}</p>
              <p><strong>Price:</strong> {packageData.price}</p>
              <ul className="list-none mt-3 space-y-1">
                {packageData.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-800">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="deliveryAddress"
                  required
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Delivery Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <select
                name="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Choose Payment Method --</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="jazzcash">JazzCash</option>
                <option value="bank">Bank Account</option>
              </select>

              {/* Payment Instructions */}
              {formData.paymentMethod && (
                <div className="bg-yellow-100 p-4 rounded-lg text-sm text-gray-800 shadow-inner">
                  {formData.paymentMethod === 'easypaisa' && (
                    <p>
                      Send payment via EasyPaisa to:<br />
                      <strong>Muhammad Ameen - 0316 0333276</strong>
                    </p>
                  )}
                  {formData.paymentMethod === 'jazzcash' && (
                    <p>
                      Send payment via JazzCash to:<br />
                      <strong>Muhammad Ameen - 0316 0333276</strong>
                    </p>
                  )}
                  {formData.paymentMethod === 'bank' && (
                    <p>
                      Transfer to Bank Account:<br />
                      <strong>Meezan Bank</strong><br />
                      <strong>Account Title:</strong> Muhammad Ameen<br />
                      <strong>Account No:</strong> 1234 5678 9012 3456
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
              >
                Submit Order
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageBuy;
