// client/src/components/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>&copy; {new Date().getFullYear()} Kanxa Safari. All Rights Reserved.</p>
                <div style={styles.links}>
                    <a href="/about" style={styles.link}>About Us</a>
                    <a href="/contact" style={styles.link}>Contact</a>
                    <a href="/privacy" style={styles.link}>Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    links: {
        display: 'flex',
        gap: '1.5rem',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    }
};

export default Footer;