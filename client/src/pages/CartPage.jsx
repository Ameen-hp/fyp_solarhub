import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'CashOnDelivery',
  });

  useEffect(() => {
    const fetchComponentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ComponentOrder/${id}`);
        console.log("Fetched Data:", response.data);
        setComponent(response.data);
      } catch (error) {
        console.error('Error fetching component details:', error);
        setError('Failed to load component details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComponentDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/customerComOrder', customerDetails);
    console.log('Order successfully placed:', response.data);
    alert('Order placed successfully!');
    // Reset the form after submission
    setCustomerDetails({
      name: '',
      email: '',
      address: '',
      phone: '',
      paymentMethod: 'CashOnDelivery',
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('There was an issue with placing your order. Please try again later.');
  }
};


  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-blue-700">Loading component details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Component Details</h1>

        {component ? (
          <div className="space-y-6">
            <img
              src={component.product.image_url}
              alt={component.product.name}
              className="w-full h-72 object-cover rounded-lg shadow-lg transform transition-all hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{component.product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{component.product.description}</p>

            <div className="text-lg text-gray-600">
              <p><span className="font-semibold">Category:</span> {component.product.category}</p>
              <p><span className="font-semibold">Material:</span> {component.product.material}</p>
              <p><span className="font-semibold">Price:</span> ${component.product.price}</p>
              <p><span className="font-semibold">Weight Capacity:</span> {component.product.weight_capacity}</p>
              <p><span className="font-semibold">Availability:</span> {component.product.availability}</p>
            </div>

            {/* Features */}
            {component.product.features && component.product.features.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Features:</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {component.product.features.map((feature, index) => (
                    <li key={index}>
                      <span className="font-medium">{Object.keys(feature)[0]}:</span> {Object.values(feature)[0]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-4"><span className="font-semibold text-blue-600">Available:</span> {component.product.available ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">No component details found</p>
        )}

        {/* Customer Information Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-50 p-6 mt-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Enter Your Information</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
              required
              pattern="^[0-9]{10,15}$"
              title="Phone number should be 10-15 digits"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={customerDetails.paymentMethod === 'CashOnDelivery'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="JazzCash"
                  checked={customerDetails.paymentMethod === 'JazzCash'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                JazzCash
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="EasyPaisa"
                  checked={customerDetails.paymentMethod === 'EasyPaisa'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                EasyPaisa
              </label>
            </div>
          </div>

          {(customerDetails.paymentMethod === 'JazzCash' || customerDetails.paymentMethod === 'EasyPaisa') && (
            <div className="mb-4 text-center p-3 bg-yellow-100 border border-yellow-300 rounded-md">
              <p className="text-sm font-semibold text-gray-700">Please use the following account number for payment:</p>
              <p className="font-semibold text-blue-700">03160333276 Muhammad Ameen</p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
