import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ModernHomePage = () => {
    const { user } = useAuth();
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    const services = [
        {
            icon: '🚌',
            title: 'Premium Transportation',
            description: 'Luxury buses and cargo services connecting major cities with comfort and reliability.',
            features: ['Daily & Nightly Services', 'Online Seat Booking', 'Real-time Tracking', 'Premium Comfort'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            link: '/transportation'
        },
        {
            icon: '🏗️',
            title: 'Construction Supplies',
            description: 'High-quality building materials and machinery at competitive prices for all your projects.',
            features: ['Premium Materials', 'JCB & Machinery', 'Bulk Orders', 'Fast Delivery'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            link: '/construction'
        },
        {
            icon: '🔧',
            title: 'Garage & Workshop',
            description: 'Expert maintenance and repair services for tractors and heavy machinery.',
            features: ['Expert Technicians', 'Genuine Parts', '24/7 Support', 'Quality Service'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            link: '/garage'
        }
    ];

    const testimonials = [
        {
            name: 'Rajesh Sharma',
            role: 'Construction Manager',
            company: 'Himalayan Builders',
            content: 'Kanxa Safari has been our trusted partner for transportation and construction supplies. Their quality and reliability are unmatched.',
            avatar: '👨‍💼',
            rating: 5
        },
        {
            name: 'Priya Ghimire',
            role: 'Business Owner',
            company: 'Mountain Logistics',
            content: 'The online booking system is fantastic! Easy to use and the buses are always on time. Highly recommended for business travel.',
            avatar: '👩‍💼',
            rating: 5
        },
        {
            name: 'Kumar Thapa',
            role: 'Farmer',
            company: 'Thapa Agriculture',
            content: 'Their tractor maintenance service saved us during harvest season. Professional team with genuine parts at fair prices.',
            avatar: '👨‍🌾',
            rating: 5
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Happy Customers', icon: '👥' },
        { number: '15+', label: 'Years Experience', icon: '⭐' },
        { number: '200+', label: 'Vehicles', icon: '🚌' },
        { number: '99.9%', label: 'Reliability', icon: '🎯' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroBackground}>
                    <div style={styles.heroOverlay}></div>
                </div>
                <div style={styles.heroContent}>
                    <div style={styles.heroText}>
                        <h1 style={styles.heroTitle}>
                            Welcome to <span style={styles.brand}>Kanxa Safari</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Your trusted partner for premium transportation, quality construction supplies, 
                            and expert machinery services across Nepal.
                        </p>
                        <div style={styles.heroButtons}>
                            {user ? (
                                <Link to="/dashboard" style={styles.primaryButton}>
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" style={styles.primaryButton}>
                                        Get Started
                                    </Link>
                                    <Link to="/login" style={styles.secondaryButton}>
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div style={styles.heroVisual}>
                        <div style={styles.floatingCard}>
                            <div style={styles.cardIcon}>🚌</div>
                            <div style={styles.cardContent}>
                                <h3>Premium Transport</h3>
                                <p>Comfortable & Safe</p>
                            </div>
                        </div>
                        <div style={styles.floatingCard}>
                            <div style={styles.cardIcon}>🏗️</div>
                            <div style={styles.cardContent}>
                                <h3>Quality Materials</h3>
                                <p>Best Prices</p>
                            </div>
                        </div>
                        <div style={styles.floatingCard}>
                            <div style={styles.cardIcon}>🔧</div>
                            <div style={styles.cardContent}>
                                <h3>Expert Service</h3>
                                <p>24/7 Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={styles.stats} data-animate id="stats">
                <div style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            style={{
                                ...styles.statCard,
                                animationDelay: `${index * 0.1}s`
                            }}
                            className={isVisible.stats ? 'animate-fade-in' : ''}
                        >
                            <div style={styles.statIcon}>{stat.icon}</div>
                            <div style={styles.statNumber}>{stat.number}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section style={styles.services} data-animate id="services">
                <div style={styles.sectionContainer}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Our Premium Services</h2>
                        <p style={styles.sectionSubtitle}>
                            Comprehensive solutions for all your transportation, construction, and maintenance needs
                        </p>
                    </div>
                    <div style={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                style={{
                                    ...styles.serviceCard,
                                    background: service.gradient
                                }}
                                className={isVisible.services ? 'hover-lift' : ''}
                            >
                                <div style={styles.serviceIcon}>{service.icon}</div>
                                <h3 style={styles.serviceTitle}>{service.title}</h3>
                                <p style={styles.serviceDescription}>{service.description}</p>
                                <ul style={styles.serviceFeatures}>
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} style={styles.serviceFeature}>
                                            <span style={styles.featureCheck}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to={service.link} style={styles.serviceButton}>
                                    Explore Service
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.features} data-animate id="features">
                <div style={styles.sectionContainer}>
                    <div style={styles.featuresGrid}>
                        <div style={styles.featuresContent}>
                            <h2 style={styles.featuresTitle}>Why Choose Kanxa Safari?</h2>
                            <div style={styles.featuresList}>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIconWrapper}>
                                        <span style={styles.featureIcon}>🎯</span>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Reliability First</h4>
                                        <p style={styles.featureItemText}>
                                            Over 15 years of trusted service with 99.9% on-time performance
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIconWrapper}>
                                        <span style={styles.featureIcon}>💎</span>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Premium Quality</h4>
                                        <p style={styles.featureItemText}>
                                            High-quality materials and luxury transportation for the best experience
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIconWrapper}>
                                        <span style={styles.featureIcon}>📱</span>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Digital First</h4>
                                        <p style={styles.featureItemText}>
                                            Easy online booking, real-time tracking, and instant notifications
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIconWrapper}>
                                        <span style={styles.featureIcon}>🛡️</span>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Safety & Security</h4>
                                        <p style={styles.featureItemText}>
                                            Comprehensive insurance, safety protocols, and secure payments
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.featuresVisual}>
                            <div style={styles.phoneFrame}>
                                <div style={styles.phoneScreen}>
                                    <div style={styles.appHeader}>
                                        <div style={styles.appLogo}>🐘</div>
                                        <span>Kanxa Safari</span>
                                    </div>
                                    <div style={styles.appContent}>
                                        <div style={styles.appCard}>
                                            <span>🚌</span>
                                            <span>Book Transportation</span>
                                        </div>
                                        <div style={styles.appCard}>
                                            <span>🏗️</span>
                                            <span>Order Supplies</span>
                                        </div>
                                        <div style={styles.appCard}>
                                            <span>🔧</span>
                                            <span>Service Request</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.testimonials} data-animate id="testimonials">
                <div style={styles.sectionContainer}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
                        <p style={styles.sectionSubtitle}>
                            Trusted by thousands of customers across Nepal
                        </p>
                    </div>
                    <div style={styles.testimonialContainer}>
                        <div style={styles.testimonialCard}>
                            <div style={styles.testimonialContent}>
                                <div style={styles.stars}>
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <span key={i} style={styles.star}>⭐</span>
                                    ))}
                                </div>
                                <p style={styles.testimonialText}>
                                    "{testimonials[currentTestimonial].content}"
                                </p>
                                <div style={styles.testimonialAuthor}>
                                    <div style={styles.authorAvatar}>
                                        {testimonials[currentTestimonial].avatar}
                                    </div>
                                    <div>
                                        <div style={styles.authorName}>
                                            {testimonials[currentTestimonial].name}
                                        </div>
                                        <div style={styles.authorRole}>
                                            {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.testimonialDots}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    style={{
                                        ...styles.dot,
                                        backgroundColor: index === currentTestimonial ? '#007bff' : '#ddd'
                                    }}
                                    onClick={() => setCurrentTestimonial(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.cta}>
                <div style={styles.ctaContainer}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
                        <p style={styles.ctaSubtitle}>
                            Join thousands of satisfied customers and experience premium service today
                        </p>
                        <div style={styles.ctaButtons}>
                            {user ? (
                                <Link to="/dashboard" style={styles.ctaPrimaryButton}>
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" style={styles.ctaPrimaryButton}>
                                        Create Account
                                    </Link>
                                    <Link to="/contact" style={styles.ctaSecondaryButton}>
                                        Contact Us
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        overflow: 'hidden'
    },
    hero: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
    },
    heroBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.1)'
    },
    heroContent: {
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        zIndex: 1
    },
    heroText: {
        maxWidth: '600px'
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        lineHeight: '1.1',
        marginBottom: '1.5rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    brand: {
        background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        lineHeight: '1.6',
        marginBottom: '2.5rem',
        opacity: 0.9
    },
    heroButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
    },
    primaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        color: '#667eea',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
    },
    secondaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        border: '2px solid rgba(255,255,255,0.3)',
        transition: 'all 0.3s ease'
    },
    heroVisual: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
    },
    floatingCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'float 6s ease-in-out infinite',
        width: '300px'
    },
    cardIcon: {
        fontSize: '2.5rem',
        minWidth: '60px',
        textAlign: 'center'
    },
    cardContent: {
        flex: 1
    },
    stats: {
        padding: '5rem 0',
        backgroundColor: '#f8f9fa'
    },
    statsContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
    },
    statCard: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
    },
    statIcon: {
        fontSize: '3rem',
        marginBottom: '1rem'
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '0.5rem'
    },
    statLabel: {
        fontSize: '1.1rem',
        color: '#666',
        fontWeight: '500'
    },
    services: {
        padding: '6rem 0',
        backgroundColor: 'white'
    },
    sectionContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem'
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '4rem'
    },
    sectionTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '1rem'
    },
    sectionSubtitle: {
        fontSize: '1.2rem',
        color: '#7f8c8d',
        maxWidth: '600px',
        margin: '0 auto'
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
    },
    serviceCard: {
        padding: '2.5rem',
        borderRadius: '25px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    serviceIcon: {
        fontSize: '4rem',
        marginBottom: '1.5rem'
    },
    serviceTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    serviceDescription: {
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        opacity: 0.9
    },
    serviceFeatures: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 2rem 0'
    },
    serviceFeature: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '0.9rem'
    },
    featureCheck: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem'
    },
    serviceButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '25px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.3)'
    },
    features: {
        padding: '6rem 0',
        backgroundColor: '#f8f9fa'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
    },
    featuresContent: {
        maxWidth: '500px'
    },
    featuresTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '2rem'
    },
    featuresList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    featureItem: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
    },
    featureIconWrapper: {
        width: '50px',
        height: '50px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    featureIcon: {
        fontSize: '1.5rem'
    },
    featureItemTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    featureItemText: {
        color: '#7f8c8d',
        lineHeight: '1.5'
    },
    featuresVisual: {
        display: 'flex',
        justifyContent: 'center'
    },
    phoneFrame: {
        width: '300px',
        height: '600px',
        background: 'linear-gradient(145deg, #e2e8f0, #f1f5f9)',
        borderRadius: '30px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    phoneScreen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px',
        overflow: 'hidden'
    },
    appHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '30px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    appLogo: {
        fontSize: '1.5rem'
    },
    appContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    appCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#2c3e50'
    },
    testimonials: {
        padding: '6rem 0',
        backgroundColor: 'white'
    },
    testimonialContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
    },
    testimonialCard: {
        padding: '3rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '25px',
        marginBottom: '2rem'
    },
    testimonialContent: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    stars: {
        marginBottom: '1.5rem'
    },
    star: {
        fontSize: '1.2rem',
        marginRight: '0.25rem'
    },
    testimonialText: {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        color: '#2c3e50',
        fontStyle: 'italic',
        marginBottom: '2rem'
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    },
    authorAvatar: {
        fontSize: '3rem'
    },
    authorName: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    authorRole: {
        fontSize: '0.9rem',
        color: '#7f8c8d'
    },
    testimonialDots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    dot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    cta: {
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        textAlign: 'center'
    },
    ctaContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem'
    },
    ctaContent: {
        textAlign: 'center'
    },
    ctaTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    ctaSubtitle: {
        fontSize: '1.2rem',
        marginBottom: '2.5rem',
        opacity: 0.9
    },
    ctaButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
    },
    ctaPrimaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
    },
    ctaSecondaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        border: '2px solid rgba(255,255,255,0.3)',
        transition: 'all 0.3s ease'
    }
};

// Add CSS animations
const animationStyles = `
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}

.hover-lift:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem !important;
    }
    
    .features-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
    }
    
    .services-grid {
        grid-template-columns: 1fr !important;
    }
    
    .stats-container {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

export default ModernHomePage;
