import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Packages from './pages/Packages';
import RepairSolutions from './pages/RepairSolutions';
import Contact from './pages/Contact';
import ComponentsOrder from './pages/ComponentsOrder';
import PackageOrder from './pages/PackageOrder';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import UserQueries from './pages/UserQueries';
import Footer from './components/Footer';
import Components from './pages/Components';
import CartPage from './pages/CartPage';
import PackageDetails from './pages/PackageDetails';
import PackageBuy from './pages/PackageBuy';
import RepairOrderShow from './pages/RepairOrderShow'; // ✅ Keep this only

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected User Routes */}
          <Route
            path="/packages"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repair-and-solu"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <RepairSolutions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/components"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Components />
              </ProtectedRoute>
            }
          />

          {/* Protected Host Routes */}
          <Route
            path="/components-order"
            element={
              <ProtectedRoute allowedRoles={['host']}>
                <ComponentsOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/package-order"
            element={
              <ProtectedRoute allowedRoles={['host']}>
                <PackageOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userQueries"
            element={
              <ProtectedRoute allowedRoles={['host']}>
                <UserQueries />
              </ProtectedRoute>
            }
          />
          <Route
             path="/repair-orders"
            element={
              <ProtectedRoute allowedRoles={['host']}>
                <RepairOrderShow />
              </ProtectedRoute>
            }
          /> {/* ✅ Route retained for the renamed file */}

          {/* Other Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/PackageDetails/:id" element={<PackageDetails />} />
          <Route path="/PackageBuy/:id" element={<PackageBuy />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
