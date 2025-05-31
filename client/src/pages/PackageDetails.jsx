import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To handle page redirection in React Router v6

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/package/${id}`);
        if (!response.ok) {
          throw new Error('Package not found');
        }
        const data = await response.json();
        setPackageDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleBuyPackage = (packageId) => {
    // Redirecting to the PackageBuy page with the package ID using navigate
    navigate(`/packageBuy/${packageId}`);
  };

  if (loading) {
    return <div className="text-center text-2xl text-gray-500 py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-500 py-12">Error: {error}</div>;
  }

  if (!packageDetails) {
    return <div className="text-center text-2xl text-gray-500 py-12">Package details not available.</div>;
  }

  if (!Array.isArray(packageDetails.Products)) {
    return <div className="text-center text-2xl text-gray-500 py-12">No products available for this package.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">{packageDetails.PackageName}</h1>
        <p className="text-xl text-center mb-12">Category: {packageDetails.category}</p>
        
        <h2 className="text-3xl font-semibold text-center mb-8">Products Available:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageDetails.Products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">{product.name}</h3>
                <p className="text-gray-600 mt-2">Category: <span className="text-gray-800 font-medium">{product.category}</span></p>
                <p className="text-gray-600">Application: <span className="text-gray-800 font-medium">{product.application}</span></p>
                <p className="text-gray-600">Material: <span className="text-gray-800 font-medium">{product.material}</span></p>
                <p className="text-gray-600">Description: <span className="text-gray-800 font-medium">{product.description}</span></p>
                <p className="text-sm text-gray-500">Created At: {new Date(product.created_at).toLocaleDateString()}</p>
                <p className={`text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                  Available: {product.available ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Package Button (Displayed once for the whole package) */}
        <div className="text-center mt-12">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => handleBuyPackage(id)} // Trigger the buy package action
          >
            Buy Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
