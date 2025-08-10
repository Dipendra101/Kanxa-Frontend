// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

// A simple placeholder for other pages
const Placeholder = ({ title }) => <h1 style={{ textAlign: 'center', padding: '5rem' }}>{title} Page</h1>;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transportation" element={<Placeholder title="Transportation" />} />
            <Route path="/construction" element={<Placeholder title="Construction" />} />
            <Route path="/garage" element={<Placeholder title="Garage" />} />
            <Route path="/login" element={<Placeholder title="Login" />} />
            <Route path="/signup" element={<Placeholder title="Signup" />} />
            {/* We will replace these placeholders with real pages later */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;