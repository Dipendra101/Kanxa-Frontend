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
        { to: '/transportation', label: 'Transportation', icon: '🚌' },
        { to: '/construction', label: 'Construction', icon: '🏗️' },
        { to: '/garage', label: 'Garage', icon: '🔧' }
    ];

    const userMenuItems = [
        { to: '/dashboard', label: 'Dashboard', icon: '📊' },
        { to: '/my-bookings', label: 'My Bookings', icon: '🎫' },
        { to: '/my-orders', label: 'My Orders', icon: '📦' },
        { to: '/my-requests', label: 'My Service Requests', icon: '🔧' }
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
                        <span style={styles.logoEmoji}>🐘</span>
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
                            🛒
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

// Media query styles for larger screens
if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    styles.logoText.display = 'block';
}

export default ResponsiveNavbar;
