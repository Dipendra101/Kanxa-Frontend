// client/src/components/About.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: undefined });
    useEffect(() => {
        function handleResize() { setWindowSize({ width: window.innerWidth }); }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
};

const aboutImages = [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop', // Bus
    'https://images.unsplash.com/photo-1618331333494-a8025b1f9e68?q=80&w=2070&auto=format&fit=crop', // Construction Site
    'https://images.unsplash.com/photo-1555529395-09563e4df113?q=80&w=1974&auto=format&fit=crop', // Tractor
];

const About = () => {
    const { width } = useWindowSize();
    const isMobile = width <= 768;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % aboutImages.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const dynamicStyles = {
        container: { flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' },
        imageContainer: { marginBottom: isMobile ? '2rem' : '0' },
        content: { alignItems: isMobile ? 'center' : 'flex-start' }
    };

    return (
        <section style={styles.aboutSection}>
            <div style={{...styles.container, ...dynamicStyles.container}}>
                <div style={{...styles.imageContainer, ...dynamicStyles.imageContainer}}>
                     {aboutImages.map((src, index) => (
                        <img key={src} src={src} alt="Kanxa Safari Services" className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`} />
                    ))}
                </div>
                <div style={{...styles.content, ...dynamicStyles.content}}>
                    <h2 style={styles.heading}>About Kanxa Safari</h2>
                    <p style={styles.text}>
                        Founded in the heart of Lamjung, Kanxa Safari began with a simple mission: to provide reliable, safe, and accessible services that power our community's growth. From connecting towns with our transportation network to supplying essential materials for construction projects, we are more than a company—we are a partner in progress.
                    </p>
                    <p style={styles.text}>
                        Our commitment to quality and customer satisfaction drives everything we do. We believe in building lasting relationships based on trust and excellence.
                    </p>
                    <Link to="/signup" style={styles.ctaButton} className="lp-button lp-button-primary">Join Our Community</Link>
                </div>
            </div>
        </section>
    );
};

const styles = {
    aboutSection: { padding: '4rem 2rem', backgroundColor: '#fff' },
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', maxWidth: '1200px', margin: '0 auto' },
    imageContainer: {
        flex: 1,
        position: 'relative',
        minHeight: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    content: { flex: 1, display: 'flex', flexDirection: 'column' },
    heading: { fontSize: '2.5rem', marginBottom: '1.5rem', color: '#333', fontWeight: 'bold' },
    text: { color: '#666', lineHeight: '1.8', marginBottom: '1rem' },
    ctaButton: {
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.8rem 1.8rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '8px',
        textDecoration: 'none',
        textAlign: 'center',
        maxWidth: '200px',
    }
};

export default About;