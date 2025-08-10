// client/src/components/WhyChooseUs.js
import React from 'react';
import '../styles/LandingPage.css';

const features = [
    {
        icon: '🏆',
        title: 'Unmatched Reliability',
        description: 'Our services, from transportation schedules to material delivery, are dependable and punctual. We value your time and trust.'
    },
    {
        icon: '💎',
        title: 'Premium Quality Guaranteed',
        description: 'We source only the best materials and maintain our fleet to the highest standards, ensuring quality in everything we do.'
    },
    {
        icon: '✅',
        title: 'One-Stop Solution',
        description: 'Why juggle multiple vendors? Get all your transportation, construction, and garage needs met under one trusted name: Kanxa Safari.'
    },
    {
        icon: '🤝',
        title: 'Customer-Centric Approach',
        description: 'Your satisfaction is our priority. Our team is dedicated to providing friendly, supportive, and professional service every step of the way.'
    }
];

const WhyChooseUs = () => {
    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Why Choose Kanxa Safari?</h2>
                <p style={styles.subheading}>Your Partner for Quality, Reliability, and Progress.</p>
                <div style={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className="why-choose-us-card" style={styles.card}>
                            <div style={styles.iconWrapper}>{feature.icon}</div>
                            <h3 style={styles.cardTitle}>{feature.title}</h3>
                            <p style={styles.cardDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '4rem 2rem',
        backgroundColor: '#fff',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '0.5rem',
    },
    subheading: {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '4rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        textAlign: 'left',
    },
    card: {
        backgroundColor: '#f9fafb',
        padding: '2rem',
        borderRadius: '12px',
        borderTop: '4px solid #007bff'
    },
    iconWrapper: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    cardTitle: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '0.75rem',
    },
    cardDescription: {
        color: '#555',
        lineHeight: '1.6',
    }
};

export default WhyChooseUs;