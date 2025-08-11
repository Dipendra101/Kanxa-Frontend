import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './ConfirmationModal';
import ExitIcon from './ExitIcon';
import NotificationCenter from './NotificationCenter';

const ResponsiveNavbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const cartItemCount = cartItems.length;

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
        setIsModalOpen(false);
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
        if (isMobile) {
            closeMobileMenu();
        }
    };

    const navLinks = [
        {
            to: '/transportation',
            label: 'Transportation',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12V20H6V18H18V20H20V12L18 8H6L4 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="8" cy="16" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        },
        {
            to: '/construction',
            label: 'Construction',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        },
        {
            to: '/garage',
            label: 'Garage',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 1 5.1 3S1 8.9 3 10.9C4.9 12.8 7.6 13.3 9.9 12.4L19 21.7C19.4 22.1 20 22.1 20.4 21.7L22.7 19.4C23.1 19 23.1 18.4 22.7 19Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        }
    ];

    const userMenuItems = [
        {
            to: '/dashboard',
            label: 'Dashboard',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        },
        {
            to: '/my-bookings',
            label: 'My Bookings',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 2V6M9 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        },
        {
            to: '/my-orders',
            label: 'My Orders',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        },
        {
            to: '/my-requests',
            label: 'My Service Requests',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 1 5.1 3S1 8.9 3 10.9C4.9 12.8 7.6 13.3 9.9 12.4L19 21.7C19.4 22.1 20 22.1 20.4 21.7L22.7 19.4C23.1 19 23.1 18.4 22.7 19Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        }
    ];

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
                    {/* Logo */}
                    <Link to="/" style={styles.logo} onClick={handleLinkClick}>
                        <div style={styles.logoIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <span style={styles.logoText}>Kanxa Safari</span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav style={styles.nav}>
                            <ul style={styles.navList}>
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link 
                                            to={link.to} 
                                            className="lp-nav-link" 
                                            style={styles.navLink}
                                            onClick={handleLinkClick}
                                        >
                                            <span style={styles.navIcon}>{link.icon}</span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                    
                    {/* Right Section */}
                    <div style={styles.rightSection}>
                        {/* Cart */}
                        <Link to="/cart" style={styles.cartLink} onClick={handleLinkClick}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                                <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            {cartItemCount > 0 && (
                                <span style={styles.cartBadge}>{cartItemCount}</span>
                            )}
                        </Link>

                        {/* Notifications */}
                        {user && <NotificationCenter />}

                        {/* User Menu / Auth */}
                        {user ? (
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                    className="user-menu-button"
                                    style={styles.userButton}
                                >
                                    <div style={styles.userAvatar}>
                                        {(user.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    {!isMobile && (
                                        <>
                                            <span style={styles.userName}>{user.name || 'User'}</span>
                                            <span style={styles.dropdownArrow}>▼</span>
                                        </>
                                    )}
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="dropdown-menu" style={styles.dropdownMenu}>
                                        {userMenuItems.map((item) => (
                                            <Link 
                                                key={item.to}
                                                to={item.to} 
                                                className="dropdown-item" 
                                                style={styles.dropdownItem}
                                                onClick={handleLinkClick}
                                            >
                                                <span style={styles.menuIcon}>{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        ))}
                                        
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin/dashboard"
                                                className="dropdown-item"
                                                style={styles.dropdownItem}
                                                onClick={handleLinkClick}
                                            >
                                                <span style={styles.menuIcon}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2578 9.77251 19.9887C9.5799 19.7196 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    </svg>
                                                </span>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        
                                        <hr className="dropdown-divider" style={styles.divider} />
                                        
                                        <button 
                                            onClick={handleLogoutClick} 
                                            className="dropdown-item" 
                                            style={{...styles.dropdownItem, ...styles.logoutButton}}
                                        >
                                            <ExitIcon size={18} /> 
                                            <span style={{marginLeft: '0.5rem'}}>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={styles.authButtons}>
                                <Link 
                                    to="/login" 
                                    className="lp-button" 
                                    style={styles.button}
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="lp-button lp-button-primary" 
                                    style={{...styles.button, ...styles.buttonPrimary}}
                                    onClick={handleLinkClick}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <button 
                                onClick={toggleMobileMenu}
                                style={styles.hamburger}
                                aria-label="Toggle navigation menu"
                            >
                                <div style={{
                                    ...styles.hamburgerLine,
                                    transform: isMobileMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'
                                }}></div>
                                <div style={{
                                    ...styles.hamburgerLine,
                                    opacity: isMobileMenuOpen ? 0 : 1
                                }}></div>
                                <div style={{
                                    ...styles.hamburgerLine,
                                    transform: isMobileMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'
                                }}></div>
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobile && isMobileMenuOpen && (
                    <div style={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
                        <div 
                            style={styles.mobileMenu} 
                            ref={mobileMenuRef}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={styles.mobileMenuHeader}>
                                <h3 style={styles.mobileMenuTitle}>Menu</h3>
                                <button 
                                    onClick={closeMobileMenu}
                                    style={styles.closeButton}
                                    aria-label="Close menu"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <nav style={styles.mobileNav}>
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.to}
                                        to={link.to} 
                                        style={styles.mobileNavLink}
                                        onClick={closeMobileMenu}
                                    >
                                        <span style={styles.mobileNavIcon}>{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                                
                                {user && (
                                    <>
                                        <div style={styles.mobileDivider}></div>
                                        <div style={styles.mobileUserSection}>
                                            <div style={styles.mobileUserInfo}>
                                                <div style={styles.mobileUserAvatar}>
                                                    {(user.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={styles.mobileUserName}>{user.name || 'User'}</div>
                                                    <div style={styles.mobileUserRole}>
                                                        {user.role === 'admin' ? 'Administrator' : 'Customer'}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {userMenuItems.map((item) => (
                                                <Link 
                                                    key={item.to}
                                                    to={item.to} 
                                                    style={styles.mobileNavLink}
                                                    onClick={closeMobileMenu}
                                                >
                                                    <span style={styles.mobileNavIcon}>{item.icon}</span>
                                                    {item.label}
                                                </Link>
                                            ))}
                                            
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    style={styles.mobileNavLink}
                                                    onClick={closeMobileMenu}
                                                >
                                                    <span style={styles.mobileNavIcon}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2578 9.77251 19.9887C9.5799 19.7196 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                        </svg>
                                                    </span>
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {!user && (
                                    <>
                                        <div style={styles.mobileDivider}></div>
                                        <Link 
                                            to="/login" 
                                            style={styles.mobileAuthButton}
                                            onClick={closeMobileMenu}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/signup" 
                                            style={{...styles.mobileAuthButton, ...styles.mobileAuthButtonPrimary}}
                                            onClick={closeMobileMenu}
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </nav>
                            
                            {user && (
                                <div style={styles.mobileMenuFooter}>
                                    <button 
                                        onClick={handleLogoutClick}
                                        style={styles.mobileLogoutButton}
                                    >
                                        <ExitIcon size={18} />
                                        <span style={{marginLeft: '0.5rem'}}>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

const styles = {
    header: { 
        backgroundColor: '#fff', 
        padding: '1rem 0', 
        borderBottom: '1px solid #e7e7e7', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
    },
    container: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '0 1rem'
    },
    logo: { 
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.3rem', 
        fontWeight: 'bold', 
        color: '#333', 
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    },
    logoEmoji: {
        fontSize: '1.5rem'
    },
    logoText: {
        display: 'none'
    },
    nav: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    navList: { 
        listStyle: 'none', 
        display: 'flex', 
        gap: '2rem', 
        margin: 0, 
        padding: 0 
    },
    navLink: { 
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none', 
        color: '#555', 
        fontWeight: '500', 
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
    },
    navIcon: {
        fontSize: '1.1rem'
    },
    rightSection: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem' 
    },
    cartLink: { 
        position: 'relative', 
        fontSize: '1.4rem', 
        textDecoration: 'none', 
        color: '#333', 
        display: 'flex', 
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '50%',
        transition: 'background-color 0.3s ease'
    },
    cartBadge: { 
        position: 'absolute', 
        top: -2, 
        right: -5, 
        backgroundColor: '#e74c3c', 
        color: 'white', 
        borderRadius: '50%', 
        padding: '2px 6px', 
        fontSize: '0.7rem', 
        fontWeight: 'bold', 
        border: '2px solid white',
        minWidth: '18px',
        height: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease'
    },
    userAvatar: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.9rem'
    },
    userName: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#333'
    },
    dropdownArrow: {
        fontSize: '0.7rem',
        color: '#666'
    },
    authButtons: {
        display: 'flex',
        gap: '0.5rem'
    },
    button: { 
        textDecoration: 'none', 
        padding: '0.5rem 1rem', 
        borderRadius: '8px', 
        fontWeight: '500', 
        border: '1px solid #ddd', 
        color: '#333', 
        background: 'white', 
        fontSize: '0.9rem', 
        fontFamily: 'inherit', 
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease'
    },
    buttonPrimary: { 
        backgroundColor: '#007bff', 
        color: '#fff', 
        borderColor: '#007bff' 
    },
    hamburger: {
        display: 'flex',
        flexDirection: 'column',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem'
    },
    hamburgerLine: {
        width: '22px',
        height: '2px',
        backgroundColor: '#333',
        margin: '2px 0',
        transition: '0.3s',
        borderRadius: '1px'
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        padding: '0.5rem 0',
        minWidth: '200px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        zIndex: 1000
    },
    dropdownItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        textDecoration: 'none',
        color: '#333',
        fontSize: '0.9rem',
        border: 'none',
        background: 'none',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    menuIcon: {
        fontSize: '1rem',
        minWidth: '18px'
    },
    divider: {
        margin: '0.5rem 0',
        border: 'none',
        borderTop: '1px solid #e9ecef'
    },
    logoutButton: { 
        color: '#e53e3e', 
        fontWeight: '600'
    },
    mobileMenuOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        backdropFilter: 'blur(2px)'
    },
    mobileMenu: {
        position: 'absolute',
        top: '70px',
        left: '1rem',
        right: '1rem',
        backgroundColor: 'white',
        borderRadius: '15px',
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    mobileMenuHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #e9ecef'
    },
    mobileMenuTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#333',
        margin: 0
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '0.25rem',
        color: '#666'
    },
    mobileNav: {
        padding: '1rem 0'
    },
    mobileNavLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        textDecoration: 'none',
        color: '#333',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'background-color 0.2s ease'
    },
    mobileNavIcon: {
        fontSize: '1.2rem',
        minWidth: '24px'
    },
    mobileDivider: {
        height: '1px',
        backgroundColor: '#e9ecef',
        margin: '1rem 0'
    },
    mobileUserSection: {
        paddingTop: '1rem'
    },
    mobileUserInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        backgroundColor: '#f8f9fa',
        margin: '0 1rem 1rem',
        borderRadius: '10px'
    },
    mobileUserAvatar: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    mobileUserName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#333'
    },
    mobileUserRole: {
        fontSize: '0.8rem',
        color: '#666'
    },
    mobileAuthButton: {
        display: 'block',
        margin: '0.5rem 1.5rem',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        textDecoration: 'none',
        border: '1px solid #ddd',
        borderRadius: '8px',
        color: '#333',
        fontWeight: '500',
        transition: 'all 0.3s ease'
    },
    mobileAuthButtonPrimary: {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff'
    },
    mobileMenuFooter: {
        padding: '1rem 1.5rem',
        borderTop: '1px solid #e9ecef'
    },
    mobileLogoutButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '0.75rem',
        background: 'none',
        border: '1px solid #e74c3c',
        borderRadius: '8px',
        color: '#e74c3c',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
};

// Enhanced responsive styles
const responsiveStyles = `
/* Desktop styles */
@media (min-width: 769px) {
    .logo-text {
        display: block !important;
    }

    .cart-link {
        padding: 0.75rem !important;
    }

    .nav-link {
        padding: 0.75rem 1.25rem !important;
    }

    .user-button {
        padding: 0.75rem !important;
    }
}

/* Tablet styles */
@media (max-width: 768px) and (min-width: 481px) {
    .header {
        padding: 0.75rem 0 !important;
    }

    .container {
        padding: 0 1.5rem !important;
    }

    .logo {
        font-size: 1.2rem !important;
    }

    .logo-emoji {
        font-size: 1.4rem !important;
    }

    .mobile-menu {
        top: 65px !important;
        left: 1rem !important;
        right: 1rem !important;
    }

    .mobile-nav-link {
        padding: 1.25rem 1.5rem !important;
        font-size: 1.1rem !important;
    }

    .mobile-nav-icon {
        font-size: 1.3rem !important;
    }

    .mobile-user-avatar {
        width: 50px !important;
        height: 50px !important;
        font-size: 1.2rem !important;
    }
}

/* Mobile styles */
@media (max-width: 480px) {
    .header {
        padding: 0.5rem 0 !important;
    }

    .container {
        padding: 0 1rem !important;
    }

    .logo {
        font-size: 1.1rem !important;
    }

    .logo-emoji {
        font-size: 1.3rem !important;
    }

    .cart-link {
        font-size: 1.2rem !important;
        padding: 0.4rem !important;
    }

    .cart-badge {
        top: -3px !important;
        right: -6px !important;
        padding: 1px 4px !important;
        font-size: 0.65rem !important;
        min-width: 16px !important;
        height: 16px !important;
    }

    .user-button {
        padding: 0.4rem !important;
    }

    .user-avatar {
        width: 30px !important;
        height: 30px !important;
        font-size: 0.8rem !important;
    }

    .hamburger {
        padding: 0.4rem !important;
    }

    .hamburger-line {
        width: 20px !important;
        height: 2px !important;
        margin: 2px 0 !important;
    }

    .mobile-menu {
        top: 55px !important;
        left: 0.5rem !important;
        right: 0.5rem !important;
    }

    .mobile-menu-title {
        font-size: 1rem !important;
    }

    .mobile-nav-link {
        padding: 1rem 1.25rem !important;
        font-size: 1rem !important;
    }

    .mobile-nav-icon {
        font-size: 1.1rem !important;
        min-width: 20px !important;
    }

    .mobile-user-info {
        padding: 0.75rem 1.25rem !important;
        margin: 0 0.75rem 0.75rem !important;
    }

    .mobile-user-avatar {
        width: 40px !important;
        height: 40px !important;
        font-size: 1rem !important;
    }

    .mobile-user-name {
        font-size: 0.9rem !important;
    }

    .mobile-user-role {
        font-size: 0.75rem !important;
    }

    .mobile-auth-button {
        margin: 0.4rem 1.25rem !important;
        padding: 0.6rem 0.875rem !important;
        font-size: 0.875rem !important;
    }

    .mobile-logout-button {
        padding: 0.6rem !important;
        font-size: 0.875rem !important;
    }
}

/* Extra small mobile */
@media (max-width: 360px) {
    .container {
        padding: 0 0.75rem !important;
    }

    .logo {
        font-size: 1rem !important;
    }

    .logo-emoji {
        font-size: 1.2rem !important;
    }

    .mobile-menu {
        top: 50px !important;
        left: 0.25rem !important;
        right: 0.25rem !important;
    }

    .mobile-menu-header {
        padding: 0.75rem 1rem !important;
    }

    .mobile-nav-link {
        padding: 0.875rem 1rem !important;
        font-size: 0.9rem !important;
    }

    .mobile-nav-icon {
        font-size: 1rem !important;
        min-width: 18px !important;
    }

    .mobile-user-info {
        padding: 0.6rem 1rem !important;
        margin: 0 0.5rem 0.6rem !important;
    }

    .mobile-user-avatar {
        width: 35px !important;
        height: 35px !important;
        font-size: 0.9rem !important;
    }

    .mobile-auth-button {
        margin: 0.3rem 1rem !important;
        padding: 0.5rem 0.75rem !important;
        font-size: 0.8rem !important;
    }

    .mobile-logout-button {
        padding: 0.5rem !important;
        font-size: 0.8rem !important;
    }
}

/* Dropdown menu responsive adjustments */
@media (max-width: 480px) {
    .dropdown-menu {
        position: fixed !important;
        top: 50px !important;
        left: 1rem !important;
        right: 1rem !important;
        width: auto !important;
        min-width: auto !important;
        max-width: none !important;
        border-radius: 8px !important;
    }

    .dropdown-item {
        padding: 0.875rem 1rem !important;
        font-size: 0.875rem !important;
    }

    .menu-icon {
        font-size: 0.9rem !important;
        min-width: 16px !important;
    }
}

/* Touch targets for better accessibility */
@media (max-width: 768px) {
    .cart-link, .user-button, .hamburger {
        min-width: 44px !important;
        min-height: 44px !important;
    }

    .mobile-nav-link, .mobile-auth-button {
        min-height: 44px !important;
    }

    .dropdown-item {
        min-height: 44px !important;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .hamburger-line {
        height: 2px !important;
    }

    .cart-badge {
        border-width: 1px !important;
    }
}
`;

// Inject enhanced responsive styles
if (typeof document !== 'undefined') {
    const existingStyleSheet = document.querySelector('#responsive-navbar-styles');
    if (existingStyleSheet) {
        existingStyleSheet.remove();
    }

    const styleSheet = document.createElement('style');
    styleSheet.id = 'responsive-navbar-styles';
    styleSheet.textContent = responsiveStyles;
    document.head.appendChild(styleSheet);
}

export default ResponsiveNavbar;
