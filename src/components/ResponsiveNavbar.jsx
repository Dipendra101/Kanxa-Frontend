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
                                                <span style={styles.menuIcon}>⚙️</span>
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
                                                    <span style={styles.mobileNavIcon}>⚙️</span>
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
