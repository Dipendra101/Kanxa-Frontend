// client/src/components/CTA.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const CTA = () => {
    return (
        <section style={styles.ctaSection}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Ready to Get Started?</h2>
                <p style={styles.subheading}>Create an account today and experience the reliability and quality of Kanxa Safari's services firsthand.</p>
                <Link to="/signup" className="cta-button-final" style={styles.ctaButton}>
                    Create a Free Account
                </Link>
            </div>
        </section>
    );
};

const styles = {
    ctaSection: { padding: '5rem 2rem', backgroundColor: '#007bff', color: '#fff', textAlign: 'center' },
    container: { maxWidth: '800px', margin: '0 auto' },
    heading: { fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' },
    subheading: { fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: '1.7', opacity: 0.9 },
    ctaButton: {
        display: 'inline-block',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#007bff',
        backgroundColor: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    }
};

export default CTA;