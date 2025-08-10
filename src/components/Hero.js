// client/src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const Hero = () => {
    return (
        <section style={styles.hero}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <h1 style={styles.title}>Your Journey, Your Projects, Your Partner</h1>
                <p style={styles.subtitle}>Kanxa Safari offers reliable transportation, quality construction materials, and expert garage services, all under one roof.</p>
                <Link to="/transportation" className="hero-cta-button" style={styles.ctaButton}>Explore Our Services</Link>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        position: 'relative',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        backgroundImage: `url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px',
        padding: '0 1rem',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        margin: '0 0 1rem 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    subtitle: {
        fontSize: '1.25rem',
        marginBottom: '2rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    ctaButton: {
        display: 'inline-block',
        padding: '1rem 2rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '8px',
        textDecoration: 'none',
    }
};

export default Hero;