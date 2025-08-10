// client/src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import CSS for hover effects

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Column 1: About */}
                <div style={styles.column}>
                    <h3 style={styles.logo}>Kanxa Safari 🐘</h3>
                    <p style={styles.description}>
                        Your trusted partner in transportation, construction supplies, and expert garage services. We are committed to powering progress in our community.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div style={styles.column}>
                    <h4 style={styles.heading}>Quick Links</h4>
                    <ul style={styles.list}>
                        <li><Link to="/" className="footer-link" style={styles.link}>Home</Link></li>
                        <li><Link to="/transportation" className="footer-link" style={styles.link}>Transportation</Link></li>
                        <li><Link to="/construction" className="footer-link" style={styles.link}>Construction</Link></li>
                        <li><Link to="/garage" className="footer-link" style={styles.link}>Garage</Link></li>
                    </ul>
                </div>

                {/* Column 3: Support */}
                <div style={styles.column}>
                    <h4 style={styles.heading}>Support</h4>
                    <ul style={styles.list}>
                        <li><Link to="/contact" className="footer-link" style={styles.link}>Contact Us</Link></li>
                        <li><Link to="/faq" className="footer-link" style={styles.link}>FAQ</Link></li>
                        <li><Link to="/privacy-policy" className="footer-link" style={styles.link}>Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Column 4: Connect */}
                <div style={styles.column}>
                    <h4 style={styles.heading}>Connect With Us</h4>
                    <div style={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialLink}>📘</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialLink}>📸</a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialLink}>🎵</a>
                    </div>
                </div>
            </div>
            <div style={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Kanxa Safari. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#2c3e50', // A deep, professional blue-gray
        color: '#ecf0f1',
        padding: '4rem 2rem 0',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', // Responsive columns
        gap: '2rem',
        paddingBottom: '3rem',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '1rem',
    },
    description: {
        lineHeight: '1.7',
        color: '#bdc3c7',
        fontSize: '0.9rem',
    },
    heading: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    link: {
        color: '#bdc3c7',
        textDecoration: 'none',
        marginBottom: '0.8rem',
        display: 'inline-block',
    },
    socialIcons: {
        display: 'flex',
        gap: '1.5rem',
    },
    socialLink: {
        fontSize: '1.5rem',
        textDecoration: 'none',
    },
    bottomBar: {
        borderTop: '1px solid #34495e',
        padding: '1.5rem 0',
        textAlign: 'center',
        color: '#bdc3c7',
        fontSize: '0.9rem',
    }
};

export default Footer;