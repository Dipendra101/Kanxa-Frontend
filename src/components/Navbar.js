// client/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Kanxa Safari 🐘
        </Link>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/transportation" style={styles.navLink}>Transportation</Link></li>
            <li><Link to="/construction" style={styles.navLink}>Construction</Link></li>
            <li><Link to="/garage" style={styles.navLink}>Garage</Link></li>
          </ul>
        </nav>
        <div>
          <Link to="/login" style={styles.button}>Login</Link>
          <Link to="/signup" style={{...styles.button, ...styles.buttonPrimary}}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e7e7e7',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: 'none',
    color: '#555',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  button: {
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    marginLeft: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s, color 0.3s',
    border: '1px solid #ddd',
    color: '#333',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
  }
};

export default Navbar;