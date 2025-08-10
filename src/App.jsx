// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Import New Pages
import TransportationPage from './pages/TransportationPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

const Placeholder = ({ title }) => <h1 style={{ textAlign: 'center', padding: '5rem' }}>{title} Page</h1>;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Transportation Routes */}
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/book-seat/:vehicleId" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            
            {/* Placeholder Routes */}
            <Route path="/construction" element={<Placeholder title="Construction" />} />
            <Route path="/garage" element={<Placeholder title="Garage" />} />
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            <Route path="/faq" element={<Placeholder title="FAQ" />} />
            <Route path="/privacy-policy" element={<Placeholder title="Privacy Policy" />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;