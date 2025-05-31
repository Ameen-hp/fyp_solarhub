import React from 'react'; // ✅ ADD THIS LINE

import { FaHome, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center flex-col sm:flex-row">
        {/* Logo Section */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-white">SolarHub</h2>
          <p className="text-sm mt-2">Building a cleaner future with solar energy</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a href="/" className="flex items-center text-white hover:text-gray-300">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="/contact" className="flex items-center text-white hover:text-gray-300">
            <FaPhoneAlt className="mr-2" /> Contact
          </a>
          
        </div>

        {/* Social Media Icons Section */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
