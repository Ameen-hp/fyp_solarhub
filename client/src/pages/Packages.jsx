import React from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    id: '1',
    name: 'One Room DC System Family',
    summary: 'Affordable solar setup for one-room homes, perfect for small families needing basic appliances.',
    price: 50000,
  },
  {
    id: '2',
    name: 'Two Room DC System Package',
    summary: 'Extended solar DC solution for two rooms, providing more power and comfort.',
    price: 100000,
  },
  {
    id: '3',
    name: 'One Family Package',
    summary: 'Reliable solar package for a small family setup with essentials like fans and lights.',
    price: 20000,
  },
  {
    id: '4',
    name: 'For Hotel, Shop, Medical Stores',
    summary: 'Tailored solar solution for small businesses like shops, hotels, or clinics.',
    price: 500000,
  },
  {
    id: '5',
    name: 'For Middle Level People',
    summary: 'Mid-range solar system that runs AC, washing machine, and essential appliances.',
    price: 1000000,
  },
  {
    id: '6',
    name: 'Smart High Home System',
    summary: 'Premium solar solution for high-end homes with complete energy independence.',
    price: 1500000,
  },
  {
    id: '7',
    name: 'Tube Well 3-Phase Line System',
    summary: 'Rugged solar power system for agricultural tube wells and water motors.',
    price: 2000000,
  },
  {
    id: '8',
    name: 'Factory and Mills System',
    summary: 'Heavy-duty industrial solar setup for factories and large-scale energy needs.',
    price: 300000,
  },
];

export default function Packages() {
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/PackageDetails/${id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md mb-10 rounded-xl">
        <h1 className="text-[5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw] text-white font-bold text-center">
          SolarHub Packages
        </h1>
      </nav>

      <h2 className="text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw] font-extrabold text-center mb-8 text-blue-800">
        Choose Your Solar Package
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-blue-600 text-white rounded-2xl p-6 border border-blue-300 shadow-lg flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-[4.5vw] sm:text-[2.8vw] md:text-[2vw] font-semibold mb-3">{pkg.name}</h3>
              <p className="text-[3.5vw] sm:text-[2vw] md:text-[1.2vw] mb-6">{pkg.summary}</p>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <span className="font-bold bg-white text-blue-600 py-1 px-4 rounded-full w-fit text-[3vw] sm:text-[1.5vw]">{`PKR ${pkg.price.toLocaleString()}`}</span>
              <button
                onClick={() => handleDetails(pkg.id)}
                className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-2 rounded-lg text-[3vw] sm:text-[1.5vw] transition-all duration-300 font-medium"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

