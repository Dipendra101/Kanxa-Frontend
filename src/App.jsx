// client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Core Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Transportation Pages
import TransportationPage from './pages/TransportationPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Construction Pages
import ConstructionPage from './pages/ConstructionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';

// Garage Pages
import GaragePage from './pages/GaragePage';
import GarageStorePage from './pages/GarageStorePage'; // <-- NEW
import MyRequestsPage from './pages/MyRequestsPage';


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

            {/* --- USER DASHBOARD ROUTES --- */}
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
            <Route path="/garage/store" element={<GarageStorePage />} /> {/* <-- NEW */}

            {/* --- PLACEHOLDER ROUTES --- */}
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