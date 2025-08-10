// client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Core Pages
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Transportation Pages
import TransportationPage from './pages/TransportationPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Construction (E-commerce) Pages
import ConstructionPage from './pages/ConstructionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';

// Placeholder for pages not yet built
const Placeholder = ({ title }) => <h1 style={{ textAlign: 'center', padding: '5rem' }}>{title} Page</h1>;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            {/* --- CORE ROUTES --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* --- TRANSPORTATION ROUTES --- */}
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/book-seat/:vehicleId" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />

            {/* --- CONSTRUCTION ROUTES --- */}
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />

            {/* --- PLACEHOLDER ROUTES for links in the footer etc. --- */}
            <Route path="/garage" element={<Placeholder title="Garage & Workshop" />} />
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            <Route path="/faq" element={<Placeholder title="Frequently Asked Questions" />} />
            <Route path="/privacy-policy" element={<Placeholder title="Privacy Policy" />} />
            
            {/* A catch-all 404 Route for any other path */}
            <Route path="*" element={<Placeholder title="404: Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;