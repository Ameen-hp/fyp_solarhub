import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Package, Wrench, Phone, ClipboardList, Users, LogIn, UserPlus, LogOut, Grid, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { role, name, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="font-extrabold text-2xl tracking-wide">⚡ SolarHub</div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center space-x-6 text-sm sm:text-base font-medium">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-200">
              <Home size={18} /> Home
            </Link>

            {/* User Role Conditional Links */}
            {role === 'user' && (
              <>
                <Link to="/packages" className="flex items-center gap-1 hover:text-blue-200">
                  <Package size={18} /> Packages
                </Link>
                <Link to="/components" className="flex items-center gap-1 hover:text-blue-200">
                  <Grid size={18} /> Components
                </Link>
                <Link to="/repair-and-solu" className="flex items-center gap-1 hover:text-blue-200">
                  <Wrench size={18} /> Repair & Solutions
                </Link>
                <Link to="/contact" className="flex items-center gap-1 hover:text-blue-200">
                  <Phone size={18} /> Contact
                </Link>
              </>
            )}

            {role === 'host' && (
              <>
                <Link to="/components-order" className="flex items-center gap-1 hover:text-blue-200">
                  <ClipboardList size={18} /> ComponentsOrder
                </Link>
                <Link to="/package-order" className="flex items-center gap-1 hover:text-blue-200">
                  <Package size={18} /> PackageOrder
                </Link>
                <Link to="/userQueries" className="flex items-center gap-1 hover:text-blue-200">
                  <Users size={18} /> User Queries
                </Link>
                <Link to="/repair-orders" className="flex items-center gap-1 hover:text-blue-200">
                  <Wrench size={18} /> Repair Orders
                </Link>
              </>
            )}

            {/* Logged-in user details and Logout button */}
            {role ? (
              <div className="flex items-center gap-4">
                <span className="font-semibold">👤 {name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 hover:text-blue-200">
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-1 hover:text-blue-200">
                  <UserPlus size={18} /> Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
              <Home size={18} /> Home
            </Link>

            {/* Mobile menu for 'user' role */}
            {role === 'user' && (
              <>
                <Link to="/packages" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Package size={18} /> Packages
                </Link>
                <Link to="/components" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Grid size={18} /> Components
                </Link>
                <Link to="/repair-and-solu" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Wrench size={18} /> Repair & Solutions
                </Link>
                <Link to="/contact" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Phone size={18} /> Contact
                </Link>
              </>
            )}

            {/* Mobile menu for 'host' role */}
            {role === 'host' && (
              <>
                <Link to="/components-order" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <ClipboardList size={18} /> ComponentsOrder
                </Link>
                <Link to="/package-order" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Package size={18} /> PackageOrder
                </Link>
                <Link to="/userQueries" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <Users size={18} /> User Queries
                </Link>
              </>
            )}

            {/* Logged-in user details and Logout button for mobile */}
            {role ? (
              <>
                <span className="font-semibold">👤 {name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-1 hover:text-blue-200" onClick={toggleMenu}>
                  <UserPlus size={18} /> Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
