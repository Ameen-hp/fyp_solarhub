import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Components = () => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetching components once on component mount
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/components');
        const data = await response.json();
        console.log("Fetched components:", data);
        setComponents(data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
    
    fetchComponents();
  }, []);

  // Function to filter components based on category and search term
  const filterComponents = () => {
    return components.filter((comp) => {
      const product = comp.product;
      const matchesCategory =
        selectedCategory === 'All' || product?.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearchTerm =
        product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle Buy Now button click
  const handleBuyNow = (id) => {
    navigate(`/cart/${id}`);
  };

  // Trigger filtering whenever category or search term changes
  useEffect(() => {
    setFilteredComponents(filterComponents());
  }, [selectedCategory, searchTerm, components]); // Dependencies include components

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Bar */}
      <div className="flex justify-center space-x-8 mb-6">
        {['All', 'Battery', 'Controller', 'Inverter', 'Charger'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`text-xl font-semibold ${selectedCategory === category ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search components by name or category"
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        🔧 Explore Our Premium Solar Components 🔧
      </h1>

      {filteredComponents.length === 0 ? (
        <p className="text-center text-gray-600">No components found in this category or matching the search term.</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedCategory === 'All' ? 'All Components' : `${selectedCategory} Components`}
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.map((comp) => {
              const product = comp.product;
              return (
                <div key={comp._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
                  {product?.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-md mb-4 flex items-center justify-center text-white">
                      No Image Available
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product?.name || 'Unnamed Component'}</h3>
                  <p className="text-gray-600 mb-2">{product?.description || 'No description available.'}</p>
                  <p className="text-blue-600 font-bold">
                    Price: Rs. {product?.price || 'Not Available'}
                  </p>
                  <p className="text-green-600 font-medium">
                    Availability: {product?.availability || 'Not Specified'}
                  </p>
                  <button
                    onClick={() => handleBuyNow(comp._id)} // Pass component ID to CartPage
                    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Components;
