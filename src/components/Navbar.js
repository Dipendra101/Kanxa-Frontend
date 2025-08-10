// client/src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- IMPORT useAuth
import ConfirmationModal from './ConfirmationModal';
import ExitIcon from './ExitIcon';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // <-- Get user and logout from context
    const { cartItems } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    const cartItemCount = cartItems.length;

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout(); // <-- Use context's logout function
        setIsModalOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of your account?"
            />
            <header style={styles.header}>
                <div style={styles.container}>
                    <Link to="/" style={styles.logo}>Kanxa Safari 🐘</Link>
                    
                    <nav>
                        <ul style={styles.navList}>
                            <li><Link to="/transportation" className="lp-nav-link" style={styles.navLink}>Transportation</Link></li>
                            <li><Link to="/construction" className="lp-nav-link" style={styles.navLink}>Construction</Link></li>
                            <li><Link to="/garage" className="lp-nav-link" style={styles.navLink}>Garage</Link></li>
                        </ul>
                    </nav>
                    
                    <div style={styles.rightSection}>
                        <Link to="/cart" style={styles.cartLink}>
                            🛒
                            {cartItemCount > 0 && (
                                <span style={styles.cartBadge}>{cartItemCount}</span>
                            )}
                        </Link>

                        {user ? ( // <-- Check for user from context
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="user-menu-button">
                                    My Account ▼
                                </button>
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        <li><Link to="/my-bookings" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>My Bookings</Link></li>
                                        <li><Link to="/my-orders" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>My Orders</Link></li>
                                        <li><Link to="/my-requests" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>My Service Requests</Link></li>
                                        {user.role === 'admin' && ( // <-- Show link if user is admin
                                            <li><Link to="/admin/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Admin Dashboard</Link></li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={handleLogoutClick} className="dropdown-item" style={styles.logoutButton}>
                                                <ExitIcon size={18} /> 
                                                <span style={{marginLeft: '0.5rem'}}>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="lp-button" style={styles.button}>Login</Link>
                                <Link to="/signup" className="lp-button lp-button-primary" style={{...styles.button, ...styles.buttonPrimary}}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

const styles = {
  header: { backgroundColor: '#fff', padding: '1rem 2rem', borderBottom: '1px solid #e7e7e7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#333', textDecoration: 'none' },
  navList: { listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 },
  navLink: { textDecoration: 'none', color: '#555', fontWeight: '500', fontSize: '1rem' },
  rightSection: { display: 'flex', alignItems: 'center', gap: '1rem' },
  cartLink: { position: 'relative', fontSize: '1.5rem', textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' },
  cartBadge: { position: 'absolute', top: -5, right: -10, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold', border: '2px solid white' },
  button: { textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '500', border: '1px solid #ddd', color: '#333', background: 'none', fontSize: '1rem', fontFamily: 'inherit', whiteSpace: 'nowrap' },
  buttonPrimary: { backgroundColor: '#007bff', color: '#fff', borderColor: '#007bff' },
  logoutButton: { border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#e53e3e', fontWeight: '600', display: 'flex', alignItems: 'center' }
};

export default Navbar;