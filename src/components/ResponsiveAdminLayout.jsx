import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResponsiveAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const adminNavItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊', section: 'OVERVIEW' },
        { path: '/admin/bookings', label: 'Bookings', icon: '🎫', section: 'TRANSPORTATION' },
        { path: '/admin/vehicles', label: 'Vehicles', icon: '🚌', section: 'TRANSPORTATION' },
        { path: '/admin/drivers', label: 'Drivers', icon: '👨‍✈️', section: 'TRANSPORTATION' },
        { path: '/admin/orders', label: 'Orders', icon: '📦', section: 'E-COMMERCE' },
        { path: '/admin/products', label: 'Products', icon: '🏗️', section: 'E-COMMERCE' },
        { path: '/admin/requests', label: 'Service Requests', icon: '🔧', section: 'GARAGE' },
        { path: '/admin/users', label: 'Users', icon: '👥', section: 'MANAGEMENT' },
        { path: '/admin/analytics', label: 'Analytics', icon: '📈', section: 'INSIGHTS' },
        { path: '/admin/activity', label: 'Activity Log', icon: '📋', section: 'INSIGHTS' }
    ];

    const groupedNavItems = adminNavItems.reduce((groups, item) => {
        const section = item.section;
        if (!groups[section]) {
            groups[section] = [];
        }
        groups[section].push(item);
        return groups;
    }, {});

    return (
        <div style={styles.layout}>
            {/* Mobile Header */}
            {isMobile && (
                <div style={styles.mobileHeader}>
                    <button 
                        onClick={toggleSidebar}
                        style={styles.hamburger}
                        aria-label="Toggle navigation"
                    >
                        <div style={{
                            ...styles.hamburgerLine,
                            transform: sidebarOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'
                        }}></div>
                        <div style={{
                            ...styles.hamburgerLine,
                            opacity: sidebarOpen ? 0 : 1
                        }}></div>
                        <div style={{
                            ...styles.hamburgerLine,
                            transform: sidebarOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'
                        }}></div>
                    </button>
                    <div style={styles.mobileHeaderTitle}>
                        <h2 style={styles.headerTitle}>Admin Panel</h2>
                        <span style={styles.headerSubtitle}>Welcome, {user?.name || 'Admin'}</span>
                    </div>
                </div>
            )}

            {/* Overlay for mobile */}
            {isMobile && sidebarOpen && (
                <div 
                    style={styles.overlay} 
                    onClick={closeSidebar}
                    aria-hidden="true"
                ></div>
            )}

            {/* Sidebar */}
            <aside style={{
                ...styles.sidebar,
                ...(isMobile ? {
                    position: 'fixed',
                    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    zIndex: 1001,
                    height: '100vh',
                    top: 0,
                    left: 0
                } : {})
            }}>
                <div style={styles.sidebarHeader}>
                    {!isMobile && (
                        <>
                            <h2 style={styles.sidebarTitle}>Admin Panel</h2>
                            <div style={styles.adminInfo}>
                                <div style={styles.adminAvatar}>
                                    {(user?.name || 'A').charAt(0).toUpperCase()}
                                </div>
                                <div style={styles.adminDetails}>
                                    <span style={styles.adminName}>{user?.name || 'Admin'}</span>
                                    <span style={styles.adminRole}>Administrator</span>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {isMobile && (
                        <div style={styles.mobileHeaderContent}>
                            <div style={styles.mobileBrand}>
                                <span style={styles.brandEmoji}>🐘</span>
                                <span style={styles.brandText}>Kanxa Safari</span>
                            </div>
                            <button 
                                onClick={closeSidebar}
                                style={styles.closeButton}
                                aria-label="Close navigation"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <nav style={styles.nav}>
                    {Object.entries(groupedNavItems).map(([section, items]) => (
                        <div key={section} style={styles.navSection}>
                            <div style={styles.navHeader}>{section}</div>
                            {items.map((item) => (
                                <AdminNavLink 
                                    key={item.path}
                                    to={item.path} 
                                    icon={item.icon}
                                    onClick={isMobile ? closeSidebar : undefined}
                                >
                                    {item.label}
                                </AdminNavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div style={styles.sidebarFooter}>
                    <div style={styles.footerStats}>
                        <div style={styles.statItem}>
                            <span style={styles.statValue}>99.9%</span>
                            <span style={styles.statLabel}>Uptime</span>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statValue}>2.8k</span>
                            <span style={styles.statLabel}>Users</span>
                        </div>
                    </div>
                    <div style={styles.systemStatus}>
                        <div style={styles.statusIndicator}></div>
                        <span style={styles.statusText}>All Systems Operational</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                ...styles.mainContent,
                ...(isMobile ? {
                    marginLeft: 0,
                    paddingTop: '80px'
                } : {})
            }}>
                <div style={styles.contentWrapper}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

// Enhanced NavLink component with icons
const AdminNavLink = ({ to, children, icon, onClick }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {})
            })}
        >
            <span style={styles.navIcon}>{icon}</span>
            <span style={styles.navText}>{children}</span>
            {({ isActive }) => isActive && (
                <div style={styles.activeIndicator}></div>
            )}
        </NavLink>
    );
};

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
    },
    mobileHeader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#1a202c',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    hamburger: {
        display: 'flex',
        flexDirection: 'column',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        marginRight: '1rem'
    },
    hamburgerLine: {
        width: '25px',
        height: '3px',
        backgroundColor: 'white',
        margin: '3px 0',
        transition: '0.3s',
        borderRadius: '2px'
    },
    mobileHeaderTitle: {
        flex: 1,
        color: 'white'
    },
    headerTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0',
        color: 'white'
    },
    headerSubtitle: {
        fontSize: '0.85rem',
        opacity: 0.8
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        backdropFilter: 'blur(2px)'
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#1a202c',
        color: '#a0aec0',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    },
    sidebarHeader: {
        padding: '1.5rem',
        borderBottom: '1px solid #2d3748'
    },
    sidebarTitle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '1.3rem',
        fontWeight: 'bold'
    },
    adminInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem',
        backgroundColor: '#2d3748',
        borderRadius: '10px'
    },
    adminAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    adminDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    adminName: {
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    adminRole: {
        fontSize: '0.75rem',
        color: '#a0aec0'
    },
    mobileHeaderContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    mobileBrand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    brandEmoji: {
        fontSize: '1.5rem'
    },
    brandText: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 'bold'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '0.5rem'
    },
    nav: {
        flex: 1,
        padding: '1rem 0',
        overflowY: 'auto'
    },
    navSection: {
        marginBottom: '1.5rem'
    },
    navHeader: {
        padding: '0.5rem 1.5rem',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#718096',
        letterSpacing: '0.5px'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.5rem',
        textDecoration: 'none',
        color: '#a0aec0',
        transition: 'all 0.2s ease',
        position: 'relative',
        borderRadius: '0 25px 25px 0',
        margin: '0.25rem 0 0.25rem 1rem'
    },
    navLinkActive: {
        backgroundColor: '#007bff',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
    },
    navIcon: {
        fontSize: '1.1rem',
        minWidth: '20px',
        textAlign: 'center'
    },
    navText: {
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    activeIndicator: {
        position: 'absolute',
        right: '-1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '20px',
        backgroundColor: 'white',
        borderRadius: '2px'
    },
    sidebarFooter: {
        padding: '1rem 1.5rem',
        borderTop: '1px solid #2d3748'
    },
    footerStats: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
    },
    statItem: {
        textAlign: 'center'
    },
    statValue: {
        display: 'block',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    statLabel: {
        display: 'block',
        fontSize: '0.7rem',
        color: '#a0aec0',
        textTransform: 'uppercase'
    },
    systemStatus: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        backgroundColor: '#2d3748',
        borderRadius: '8px'
    },
    statusIndicator: {
        width: '8px',
        height: '8px',
        backgroundColor: '#2ecc71',
        borderRadius: '50%',
        animation: 'pulse 2s infinite'
    },
    statusText: {
        fontSize: '0.75rem',
        color: '#a0aec0'
    },
    mainContent: {
        flex: 1,
        marginLeft: '280px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease'
    },
    contentWrapper: {
        minHeight: '100%'
    }
};

// Enhanced responsive styles
const responsiveStyles = `
/* Desktop styles */
@media (min-width: 769px) {
    .admin-layout {
        height: 100vh !important;
    }

    .sidebar {
        position: fixed !important;
        height: 100vh !important;
        overflow-y: auto !important;
    }

    .main-content {
        margin-left: 280px !important;
        padding: 2rem !important;
    }

    .nav-link {
        margin: 0.5rem 0 0.5rem 1.5rem !important;
        padding: 1rem 1.5rem !important;
    }

    .nav-icon {
        font-size: 1.2rem !important;
    }

    .nav-text {
        font-size: 1rem !important;
    }
}

/* Large tablets */
@media (max-width: 1024px) and (min-width: 769px) {
    .sidebar {
        width: 260px !important;
    }

    .main-content {
        margin-left: 260px !important;
        padding: 1.5rem !important;
    }

    .sidebar-title {
        font-size: 1.2rem !important;
    }

    .admin-info {
        padding: 0.6rem !important;
    }

    .admin-name {
        font-size: 0.85rem !important;
    }

    .admin-role {
        font-size: 0.7rem !important;
    }
}

/* Tablets */
@media (max-width: 768px) {
    .layout {
        flex-direction: column !important;
    }

    .mobile-header {
        height: 65px !important;
        padding: 0 1rem !important;
    }

    .hamburger-line {
        width: 22px !important;
        height: 2.5px !important;
    }

    .header-title {
        font-size: 1.1rem !important;
    }

    .header-subtitle {
        font-size: 0.8rem !important;
    }

    .sidebar {
        width: 300px !important;
        top: 0 !important;
    }

    .mobile-header-content {
        padding: 1rem !important;
    }

    .brand-text {
        font-size: 1rem !important;
    }

    .nav-section {
        margin-bottom: 1.25rem !important;
    }

    .nav-header {
        padding: 0.4rem 1.25rem !important;
        font-size: 0.7rem !important;
    }

    .nav-link {
        margin: 0.25rem 0 0.25rem 1rem !important;
        padding: 0.875rem 1.25rem !important;
    }

    .nav-icon {
        font-size: 1.1rem !important;
        min-width: 18px !important;
    }

    .nav-text {
        font-size: 0.9rem !important;
    }

    .sidebar-footer {
        padding: 0.875rem 1.25rem !important;
    }

    .footer-stats {
        gap: 0.75rem !important;
        margin-bottom: 0.75rem !important;
    }

    .stat-value {
        font-size: 0.9rem !important;
    }

    .stat-label {
        font-size: 0.65rem !important;
    }

    .status-text {
        font-size: 0.7rem !important;
    }

    .main-content {
        margin-left: 0 !important;
        padding-top: 85px !important;
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;
        padding-bottom: 1.5rem !important;
    }
}

/* Mobile devices */
@media (max-width: 480px) {
    .mobile-header {
        height: 60px !important;
        padding: 0 0.75rem !important;
    }

    .hamburger {
        padding: 0.375rem !important;
        margin-right: 0.75rem !important;
    }

    .hamburger-line {
        width: 20px !important;
        height: 2px !important;
        margin: 2.5px 0 !important;
    }

    .header-title {
        font-size: 1rem !important;
        margin-bottom: 0.125rem !important;
    }

    .header-subtitle {
        font-size: 0.75rem !important;
    }

    .sidebar {
        width: 280px !important;
    }

    .mobile-header-content {
        padding: 0.875rem !important;
    }

    .brand-emoji {
        font-size: 1.3rem !important;
    }

    .brand-text {
        font-size: 0.95rem !important;
    }

    .close-button {
        font-size: 1.1rem !important;
        padding: 0.375rem !important;
    }

    .nav-section {
        margin-bottom: 1rem !important;
    }

    .nav-header {
        padding: 0.375rem 1rem !important;
        font-size: 0.65rem !important;
    }

    .nav-link {
        margin: 0.25rem 0 0.25rem 0.75rem !important;
        padding: 0.75rem 1rem !important;
        border-radius: 0 20px 20px 0 !important;
    }

    .nav-icon {
        font-size: 1rem !important;
        min-width: 16px !important;
    }

    .nav-text {
        font-size: 0.85rem !important;
    }

    .sidebar-footer {
        padding: 0.75rem 1rem !important;
    }

    .footer-stats {
        grid-template-columns: 1fr 1fr !important;
        gap: 0.5rem !important;
        margin-bottom: 0.6rem !important;
    }

    .stat-value {
        font-size: 0.85rem !important;
    }

    .stat-label {
        font-size: 0.6rem !important;
    }

    .system-status {
        padding: 0.375rem !important;
    }

    .status-indicator {
        width: 6px !important;
        height: 6px !important;
    }

    .status-text {
        font-size: 0.65rem !important;
    }

    .main-content {
        padding-top: 80px !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        padding-bottom: 1rem !important;
    }
}

/* Extra small mobile */
@media (max-width: 360px) {
    .mobile-header {
        height: 55px !important;
        padding: 0 0.5rem !important;
    }

    .hamburger {
        margin-right: 0.5rem !important;
    }

    .header-title {
        font-size: 0.9rem !important;
    }

    .header-subtitle {
        font-size: 0.7rem !important;
    }

    .sidebar {
        width: 260px !important;
    }

    .mobile-header-content {
        padding: 0.75rem !important;
    }

    .brand-text {
        font-size: 0.9rem !important;
    }

    .nav-link {
        margin: 0.25rem 0 0.25rem 0.5rem !important;
        padding: 0.6rem 0.875rem !important;
    }

    .nav-icon {
        font-size: 0.9rem !important;
        min-width: 14px !important;
    }

    .nav-text {
        font-size: 0.8rem !important;
    }

    .sidebar-footer {
        padding: 0.6rem 0.875rem !important;
    }

    .footer-stats {
        gap: 0.375rem !important;
        margin-bottom: 0.5rem !important;
    }

    .stat-value {
        font-size: 0.8rem !important;
    }

    .stat-label {
        font-size: 0.55rem !important;
    }

    .status-text {
        font-size: 0.6rem !important;
    }

    .main-content {
        padding-top: 75px !important;
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
        padding-bottom: 0.75rem !important;
    }
}

/* Touch targets for better accessibility */
@media (max-width: 768px) {
    .hamburger, .close-button {
        min-width: 44px !important;
        min-height: 44px !important;
    }

    .nav-link {
        min-height: 44px !important;
    }
}

/* Animation adjustments for mobile */
@media (max-width: 768px) {
    .sidebar {
        transition: transform 0.25s ease !important;
    }

    .overlay {
        transition: opacity 0.25s ease !important;
    }
}

/* Landscape orientation adjustments */
@media (max-width: 768px) and (orientation: landscape) {
    .mobile-header {
        height: 50px !important;
    }

    .main-content {
        padding-top: 70px !important;
    }

    .nav-section {
        margin-bottom: 0.75rem !important;
    }

    .nav-link {
        padding: 0.6rem 1rem !important;
    }

    .sidebar-footer {
        padding: 0.6rem 1rem !important;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .hamburger-line {
        height: 2px !important;
    }

    .status-indicator {
        border: 1px solid rgba(255,255,255,0.1) !important;
    }
}
`;

// Inject enhanced responsive styles
if (typeof document !== 'undefined') {
    const existingStyleSheet = document.querySelector('#responsive-admin-layout-styles');
    if (existingStyleSheet) {
        existingStyleSheet.remove();
    }

    const styleSheet = document.createElement('style');
    styleSheet.id = 'responsive-admin-layout-styles';
    styleSheet.textContent = responsiveStyles;
    document.head.appendChild(styleSheet);
}

export default ResponsiveAdminLayout;
