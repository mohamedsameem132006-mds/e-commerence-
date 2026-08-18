import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Checkout from './pages/Checkout.jsx';
import MyOrders from './pages/MyOrders.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loadingAuth } = useApp();
  
  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-white text-on-surface">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/product-details" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/order-tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
