// client/src/components/OurOfferings.js
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

const offeringsData = {
    transportation: {
        title: 'Transportation Services',
        icon: '🚌',
        description: 'Connecting communities with safe, reliable, and comfortable travel options. Whether you are commuting daily or planning a special trip, we have you covered.',
        items: [
            'Daily & Nightly Bus Routes (Lamjung, Kathmandu, Pokhara)',
            'Heavy-duty Trucks for Cargo and Logistics',
            'Private Vehicle Reservations for Tours & Events',
            'Online Seat Booking & Real-time Tracking',
        ],
        images: [
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1469085819383-e00d3d57e3df?q=80&w=2070&auto=format&fit=crop'
        ],
    },
    construction: {
        title: 'Construction & Hardware Supplies',
        icon: '🏗️',
        description: 'Your trusted source for high-quality construction materials. We provide everything you need to build with confidence, from foundation to finish.',
        items: [
            'Premium Cement, Bricks, and Concrete Blocks',
            'High-grade Rebars, Gravel, and Sand',
            'Hardware essentials: Water Pipes, Tanks, and Fittings',
            'On-site Tractor and Tipper Delivery Services',
        ],
        images: [
            'https://images.unsplash.com/photo-1581192595473-b052b3a21ab3?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519447432482-849318991a03?q=80&w=2070&auto=format&fit=crop'
        ],
    },
    garage: {
        title: 'Garage & Workshop',
        icon: '🔧',
        description: 'Specialized care for your heavy machinery. Our expert mechanics and fully-stocked workshop ensure your equipment stays in peak condition.',
        items: [
            'Expert Tractor and Heavy Vehicle Repair',
            'Comprehensive Engine Diagnostics and Servicing',
            'Wide Range of Spare Parts and Workshop Tools',
            'On-site Emergency Repair Services',
        ],
        images: [
            'https://images.unsplash.com/photo-1621992300338-812e3b8a1043?q=80&w=1932&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615906655593-447a45626a55?q=80&w=1964&auto=format&fit=crop'
        ],
    }
};

const OurOfferings = () => {
    const [activeTab, setActiveTab] = useState('transportation');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const activeContent = offeringsData[activeTab];

    useEffect(() => {
        setCurrentImageIndex(0);
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % activeContent.images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [activeTab, activeContent.images.length]);

    const tabStyles = (tabName) => ({
        ...styles.tab,
        backgroundColor: activeTab === tabName ? '#007bff' : '#f0f2f5',
        color: activeTab === tabName ? '#fff' : '#333',
        width: isMobile ? '100%' : 'auto',
    });

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Our Integrated Offerings</h2>
                <p style={styles.subheading}>A detailed look into our three core business pillars.</p>

                <div style={{...styles.tabsContainer, flexDirection: isMobile ? 'column' : 'row'}}>
                    <button onClick={() => setActiveTab('transportation')} style={tabStyles('transportation')} className={`offerings-tab ${activeTab === 'transportation' ? 'active' : ''}`}>Transportation</button>
                    <button onClick={() => setActiveTab('construction')} style={tabStyles('construction')} className={`offerings-tab ${activeTab === 'construction' ? 'active' : ''}`}>Construction</button>
                    <button onClick={() => setActiveTab('garage')} style={tabStyles('garage')} className={`offerings-tab ${activeTab === 'garage' ? 'active' : ''}`}>Garage</button>
                </div>

                <div style={{...styles.contentContainer, flexDirection: isMobile ? 'column' : 'row'}}>
                    <div style={styles.imageContainer}>
                        {activeContent.images.map((src, index) => (
                            <img key={src} src={src} alt={activeContent.title} className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`} />
                        ))}
                    </div>
                    <div style={styles.textContent}>
                        <div style={styles.iconWrapper}>{activeContent.icon}</div>
                        <h3 style={styles.contentTitle}>{activeContent.title}</h3>
                        <p style={styles.contentDescription}>{activeContent.description}</p>
                        <ul style={styles.list}>
                            {activeContent.items.map((item, index) => (
                                <li key={index} style={styles.listItem}>
                                    <span style={{marginRight: '10px'}}>✅</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to={`/${activeTab}`} style={styles.ctaButton} className="offerings-cta-button">Explore More</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: { padding: '4rem 2rem', backgroundColor: '#f9fafb' },
    container: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
    heading: { fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' },
    subheading: { fontSize: '1.1rem', color: '#666', marginBottom: '3rem' },
    tabsContainer: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' },
    tab: { padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    contentContainer: { display: 'flex', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden', textAlign: 'left', gap: '2rem' },
    imageContainer: { flex: 1.2, minHeight: '450px', position: 'relative', overflow: 'hidden', borderRadius: '12px 0 0 12px' },
    textContent: { flex: 1, padding: '3rem' },
    iconWrapper: { fontSize: '2.5rem' },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' },
    contentDescription: { color: '#555', lineHeight: '1.7', marginBottom: '1.5rem' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    listItem: { display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#333' },
    ctaButton: { display: 'inline-block', marginTop: '2rem', padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', borderRadius: '8px', textDecoration: 'none' }
};

export default OurOfferings;