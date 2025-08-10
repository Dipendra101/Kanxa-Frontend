// client/src/components/Services.js

import React from 'react';
import { Link } from 'react-router-dom';

const servicesData = [
    {
        title: 'Transportation',
        description: 'Reliable and comfortable bus and truck services connecting major cities and remote areas. Book your seat or reserve a vehicle today.',
        link: '/transportation',
        icon: '🚌'
    },
    {
        title: 'Construction Supplies',
        description: 'Your one-stop shop for all construction needs, from cement and bricks to hardware and raw materials, with delivery options available.',
        link: '/construction',
        icon: '🏗️'
    },
    {
        title: 'Garage & Workshop',
        description: 'Specialized garage services for tractors and heavy vehicles, plus a wide range of essential workshop tools and parts.',
        link: '/garage',
        icon: '🔧'
    }
];

const Services = () => {
    return (
        <section style={styles.services}>
            <h2 style={styles.heading}>Our Core Services</h2>
            <div style={styles.container}>
                {servicesData.map((service, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.icon}>{service.icon}</div>
                        <h3 style={styles.cardTitle}>{service.title}</h3>
                        <p style={styles.cardDescription}>{service.description}</p>
                        <Link to={service.link} style={styles.cardLink}>Learn More</Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

const styles = {
    services: {
        padding: '4rem 2rem',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '3rem',
        color: '#333',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        flex: '1',
        minWidth: '300px',
        maxWidth: '350px',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    icon: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#333',
    },
    cardDescription: {
        color: '#666',
        marginBottom: '1.5rem',
        lineHeight: '1.6',
    },
    cardLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold',
    }
};

export default Services;