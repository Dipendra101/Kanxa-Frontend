// client/src/components/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div style={styles.layout}>
            <aside style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Admin Panel</h2>
                <nav>
                    <ul style={styles.navList}>
                        <li><AdminNavLink to="/admin/dashboard">Dashboard</AdminNavLink></li>
                        <li style={styles.navHeader}>TRANSPORTATION</li>
                        <li><AdminNavLink to="/admin/bookings">Bookings</AdminNavLink></li>
                        <li><AdminNavLink to="/admin/vehicles">Vehicles</AdminNavLink></li>
                        <li><AdminNavLink to="/admin/drivers">Drivers</AdminNavLink></li>
                        <li style={styles.navHeader}>E-COMMERCE</li>
                        <li><AdminNavLink to="/admin/orders">Orders</AdminNavLink></li>
                        <li><AdminNavLink to="/admin/products">Products</AdminNavLink></li>
                        <li style={styles.navHeader}>GARAGE</li>
                        <li><AdminNavLink to="/admin/requests">Service Requests</AdminNavLink></li>
                    </ul>
                </nav>
            </aside>
            <main style={styles.mainContent}>
                <Outlet /> {/* This is where the specific admin pages will be rendered */}
            </main>
        </div>
    );
};

// Custom NavLink to handle active styles
const AdminNavLink = ({ to, children }) => {
    const activeStyle = {
        ...styles.navLink,
        backgroundColor: '#007bff',
        color: 'white',
    };
    return (
        <NavLink
            to={to}
            style={({ isActive }) => (isActive ? activeStyle : styles.navLink)}
        >
            {children}
        </NavLink>
    );
};

const styles = {
    layout: { display: 'flex', minHeight: 'calc(100vh - 70px)' /* Adjust based on navbar height */ },
    sidebar: {
        width: '250px',
        backgroundColor: '#1a202c', // Dark background
        color: '#a0aec0', // Light gray text
        padding: '1.5rem',
    },
    sidebarTitle: { color: 'white', textAlign: 'center', marginBottom: '2rem' },
    navList: { listStyle: 'none', padding: 0, margin: 0 },
    navHeader: { padding: '1rem 0 0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#718096' },
    navLink: {
        display: 'block',
        padding: '0.75rem 1rem',
        textDecoration: 'none',
        color: '#a0aec0',
        borderRadius: '8px',
        marginBottom: '0.5rem',
        transition: 'background-color 0.2s',
    },
    mainContent: {
        flex: 1,
        padding: '2rem',
        backgroundColor: '#f7fafc',
    },
};

export default AdminLayout;