// client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Core Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // <-- IMPORT

// User Dashboard Pages
import MyBookingsPage from './pages/MyBookingsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyRequestsPage from './pages/MyRequestsPage';

// Main Feature Pages
import TransportationPage from './pages/TransportationPage';
import BookingPage from './pages/BookingPage';
import ConstructionPage from './pages/ConstructionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import GaragePage from './pages/GaragePage';
import GarageStorePage from './pages/GarageStorePage';

// Admin Components & Pages
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import EnhancedDashboardPage from './pages/admin/EnhancedDashboardPage';
import VehicleManagementPage from './pages/admin/VehicleManagementPage';
import BookingManagementPage from './pages/admin/BookingManagementPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';

const Placeholder = ({ title }) => <h1 style={{ textAlign: 'center', padding: '5rem' }}>{title} Page</h1>;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            {/* --- CORE & PUBLIC ROUTES --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* --- GENERAL DASHBOARD REDIRECT --- */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* --- USER-SPECIFIC ROUTES --- */}
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />

            {/* --- MAIN FEATURE ROUTES --- */}
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/book-seat/:vehicleId" element={<BookingPage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/garage/store" element={<GarageStorePage />} />

            {/* --- ADMIN ROUTES --- */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<EnhancedDashboardPage />} />
                    <Route path="bookings" element={<BookingManagementPage />} />
                    <Route path="vehicles" element={<VehicleManagementPage />} />
                    <Route path="drivers" element={<Placeholder title="Admin Drivers Management" />} />
                    <Route path="orders" element={<Placeholder title="Admin Orders Management" />} />
                    <Route path="products" element={<ProductManagementPage />} />
                    <Route path="requests" element={<Placeholder title="Admin Service Requests" />} />
                    <Route path="users" element={<Placeholder title="Admin User Management" />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="activity" element={<Placeholder title="Admin Activity Log" />} />
                </Route>
            </Route>

            {/* --- MISC & FALLBACK ROUTES --- */}
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            <Route path="/faq" element={<Placeholder title="Frequently Asked Questions" />} />
            <Route path="/privacy-policy" element={<Placeholder title="Privacy Policy" />} />
            <Route path="*" element={<Placeholder title="404: Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
