import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalHomePage = () => {
    const { user } = useAuth();
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const services = [
        {
            title: 'Transportation Services',
            description: 'Professional fleet management with luxury buses and cargo vehicles connecting major cities across Nepal.',
            features: ['Daily & Nightly Services', 'Real-time Tracking', 'Online Booking System', 'Professional Drivers'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12L2 13L12 21L22 13L21 12L12 19L3 12Z" fill="currentColor"/>
                    <path d="M3 7L12 15L21 7L12 1L3 7Z" fill="currentColor"/>
                </svg>
            ),
            link: '/transportation'
        },
        {
            title: 'Construction Materials',
            description: 'Premium building supplies and heavy machinery rental services for construction projects of any scale.',
            features: ['Quality Materials', 'Heavy Machinery', 'Competitive Pricing', 'Fast Delivery'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" fill="currentColor"/>
                </svg>
            ),
            link: '/construction'
        },
        {
            title: 'Workshop Services',
            description: 'Expert maintenance and repair solutions for tractors, heavy machinery, and industrial equipment.',
            features: ['Expert Technicians', 'Genuine Parts', '24/7 Support', 'Preventive Maintenance'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 1 5.1 3S1 8.9 3 10.9C4.9 12.8 7.6 13.3 9.9 12.4L19 21.7C19.4 22.1 20 22.1 20.4 21.7L22.7 19.4C23.1 19 23.1 18.4 22.7 19Z" fill="currentColor"/>
                </svg>
            ),
            link: '/garage'
        }
    ];

    const testimonials = [
        {
            name: 'Rajesh Sharma',
            role: 'Operations Director',
            company: 'Himalayan Construction Ltd.',
            content: 'Kanxa Safari has been our trusted logistics partner for over 5 years. Their professional service and reliable fleet have significantly improved our project delivery timelines.',
            rating: 5
        },
        {
            name: 'Priya Ghimire',
            role: 'Supply Chain Manager',
            company: 'Mountain Logistics',
            content: 'The integrated platform makes managing our transportation and material procurement incredibly efficient. Real-time tracking and professional support are outstanding.',
            rating: 5
        },
        {
            name: 'Kumar Thapa',
            role: 'Farm Operations Manager',
            company: 'Thapa Agriculture Enterprise',
            content: 'Their workshop services have kept our machinery running smoothly. Professional technicians and genuine parts ensure minimal downtime during critical seasons.',
            rating: 5
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Satisfied Customers', description: 'Businesses trust our services' },
        { number: '15+', label: 'Years Experience', description: 'Proven track record' },
        { number: '200+', label: 'Fleet Vehicles', description: 'Modern transportation' },
        { number: '99.9%', label: 'Service Reliability', description: 'Consistent performance' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <div style={styles.heroText}>
                        <h1 style={styles.heroTitle}>
                            Professional Transportation & Construction Services
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Streamline your business operations with our integrated platform for transportation logistics, 
                            construction materials procurement, and professional workshop services across Nepal.
                        </p>
                        <div style={styles.heroButtons}>
                            {user ? (
                                <Link to="/dashboard" style={styles.primaryButton}>
                                    Access Dashboard
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
                        
                        {/* Trust Indicators */}
                        <div style={styles.trustIndicators}>
                            <div style={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" fill="currentColor"/>
                                </svg>
                                <span>Enterprise Security</span>
                            </div>
                            <div style={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>ISO Certified</span>
                            </div>
                            <div style={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.heroVisual}>
                        <div style={styles.dashboardPreview}>
                            <div style={styles.previewHeader}>
                                <div style={styles.previewDots}>
                                    <span></span><span></span><span></span>
                                </div>
                                <span style={styles.previewTitle}>Business Dashboard</span>
                            </div>
                            <div style={styles.previewContent}>
                                <div style={styles.previewCard}>
                                    <div style={styles.previewIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12L2 13L12 21L22 13L21 12L12 19L3 12Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div style={styles.previewCardContent}>
                                        <div style={styles.previewCardTitle}>Transportation</div>
                                        <div style={styles.previewCardSubtitle}>Fleet Management</div>
                                    </div>
                                </div>
                                <div style={styles.previewCard}>
                                    <div style={styles.previewIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div style={styles.previewCardContent}>
                                        <div style={styles.previewCardTitle}>Construction</div>
                                        <div style={styles.previewCardSubtitle}>Material Supply</div>
                                    </div>
                                </div>
                                <div style={styles.previewCard}>
                                    <div style={styles.previewIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 1 5.1 3S1 8.9 3 10.9C4.9 12.8 7.6 13.3 9.9 12.4L19 21.7C19.4 22.1 20 22.1 20.4 21.7L22.7 19.4C23.1 19 23.1 18.4 22.7 19Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <div style={styles.previewCardContent}>
                                        <div style={styles.previewCardTitle}>Workshop</div>
                                        <div style={styles.previewCardSubtitle}>Maintenance Services</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={styles.stats}>
                <div style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <div key={index} style={styles.statCard}>
                            <div style={styles.statNumber}>{stat.number}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                            <div style={styles.statDescription}>{stat.description}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section style={styles.services}>
                <div style={styles.sectionContainer}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Our Professional Services</h2>
                        <p style={styles.sectionSubtitle}>
                            Comprehensive business solutions for transportation, construction, and maintenance needs
                        </p>
                    </div>
                    <div style={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div key={index} style={styles.serviceCard}>
                                <div style={styles.serviceIcon}>
                                    {service.icon}
                                </div>
                                <h3 style={styles.serviceTitle}>{service.title}</h3>
                                <p style={styles.serviceDescription}>{service.description}</p>
                                <ul style={styles.serviceFeatures}>
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} style={styles.serviceFeature}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to={service.link} style={styles.serviceButton}>
                                    Learn More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.features}>
                <div style={styles.sectionContainer}>
                    <div style={styles.featuresGrid}>
                        <div style={styles.featuresContent}>
                            <h2 style={styles.featuresTitle}>Why Choose Kanxa Safari?</h2>
                            <div style={styles.featuresList}>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Proven Reliability</h4>
                                        <p style={styles.featureItemText}>
                                            Over 15 years of consistent service delivery with 99.9% uptime
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Enterprise Security</h4>
                                        <p style={styles.featureItemText}>
                                            Bank-level security protocols and comprehensive insurance coverage
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Integrated Platform</h4>
                                        <p style={styles.featureItemText}>
                                            Single dashboard for all your logistics and operational needs
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.featureItem}>
                                    <div style={styles.featureIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7006C21.7033 16.047 20.9941 15.5957 20.197 15.4183" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1049 4.55232C18.5868 5.25392 18.7594 6.11683 18.5875 6.95298C18.4156 7.78914 17.9096 8.53198 17.1648 9.01207C16.4199 9.49216 15.4956 9.67195 14.613 9.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 style={styles.featureItemTitle}>Expert Support</h4>
                                        <p style={styles.featureItemText}>
                                            Dedicated account managers and 24/7 technical support
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.featuresVisual}>
                            <div style={styles.visualCard}>
                                <div style={styles.visualHeader}>
                                    <h4>Real-time Analytics</h4>
                                </div>
                                <div style={styles.visualContent}>
                                    <div style={styles.chart}>
                                        <div style={styles.chartBar} data-height="80%"></div>
                                        <div style={styles.chartBar} data-height="60%"></div>
                                        <div style={styles.chartBar} data-height="90%"></div>
                                        <div style={styles.chartBar} data-height="70%"></div>
                                        <div style={styles.chartBar} data-height="85%"></div>
                                    </div>
                                    <div style={styles.metrics}>
                                        <div style={styles.metric}>
                                            <span style={styles.metricValue}>98.5%</span>
                                            <span style={styles.metricLabel}>Delivery Rate</span>
                                        </div>
                                        <div style={styles.metric}>
                                            <span style={styles.metricValue}>2.4min</span>
                                            <span style={styles.metricLabel}>Avg Response</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.testimonials}>
                <div style={styles.sectionContainer}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
                        <p style={styles.sectionSubtitle}>
                            Trusted by leading businesses across Nepal
                        </p>
                    </div>
                    <div style={styles.testimonialContainer}>
                        <div style={styles.testimonialCard}>
                            <div style={styles.testimonialContent}>
                                <div style={styles.stars}>
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                        </svg>
                                    ))}
                                </div>
                                <p style={styles.testimonialText}>
                                    "{testimonials[currentTestimonial].content}"
                                </p>
                                <div style={styles.testimonialAuthor}>
                                    <div style={styles.authorInfo}>
                                        <div style={styles.authorName}>
                                            {testimonials[currentTestimonial].name}
                                        </div>
                                        <div style={styles.authorRole}>
                                            {testimonials[currentTestimonial].role}
                                        </div>
                                        <div style={styles.authorCompany}>
                                            {testimonials[currentTestimonial].company}
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
                                        backgroundColor: index === currentTestimonial ? '#3b82f6' : '#d1d5db'
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
                        <h2 style={styles.ctaTitle}>Ready to Streamline Your Operations?</h2>
                        <p style={styles.ctaSubtitle}>
                            Join thousands of businesses that trust Kanxa Safari for their logistics and operational needs.
                        </p>
                        <div style={styles.ctaButtons}>
                            {user ? (
                                <Link to="/dashboard" style={styles.ctaPrimaryButton}>
                                    Access Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" style={styles.ctaPrimaryButton}>
                                        Start Your Trial
                                    </Link>
                                    <Link to="/contact" style={styles.ctaSecondaryButton}>
                                        Contact Sales
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
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
    },
    heroText: {
        maxWidth: '600px'
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        lineHeight: '1.1',
        marginBottom: '1.5rem',
        color: '#1e293b'
    },
    heroSubtitle: {
        fontSize: '1.125rem',
        lineHeight: '1.6',
        marginBottom: '2rem',
        color: '#64748b'
    },
    heroButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '2rem'
    },
    primaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#1e293b',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'all 0.2s ease'
    },
    secondaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'white',
        color: '#1e293b',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        border: '1px solid #d1d5db',
        transition: 'all 0.2s ease'
    },
    trustIndicators: {
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap'
    },
    trustItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#64748b',
        fontSize: '0.875rem'
    },
    heroVisual: {
        display: 'flex',
        justifyContent: 'center'
    },
    dashboardPreview: {
        width: '400px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
    },
    previewHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
    },
    previewDots: {
        display: 'flex',
        gap: '0.25rem'
    },
    previewTitle: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#64748b'
    },
    previewContent: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    previewCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
    },
    previewIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: '#3b82f6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    previewCardContent: {
        flex: 1
    },
    previewCardTitle: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#1e293b'
    },
    previewCardSubtitle: {
        fontSize: '0.75rem',
        color: '#64748b'
    },
    stats: {
        padding: '4rem 0',
        backgroundColor: 'white'
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
        backgroundColor: '#f8fafc',
        borderRadius: '12px'
    },
    statNumber: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: '0.5rem'
    },
    statLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '0.25rem'
    },
    statDescription: {
        fontSize: '0.875rem',
        color: '#64748b'
    },
    services: {
        padding: '5rem 0',
        backgroundColor: '#f8fafc'
    },
    sectionContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    sectionTitle: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem'
    },
    sectionSubtitle: {
        fontSize: '1.125rem',
        color: '#64748b',
        maxWidth: '600px',
        margin: '0 auto'
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
    },
    serviceCard: {
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease'
    },
    serviceIcon: {
        width: '48px',
        height: '48px',
        backgroundColor: '#3b82f6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginBottom: '1.5rem'
    },
    serviceTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem'
    },
    serviceDescription: {
        fontSize: '0.875rem',
        lineHeight: '1.6',
        color: '#64748b',
        marginBottom: '1.5rem'
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
        fontSize: '0.875rem',
        color: '#374151'
    },
    serviceButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#f8fafc',
        color: '#3b82f6',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease'
    },
    features: {
        padding: '5rem 0',
        backgroundColor: 'white'
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
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#1e293b',
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
    featureIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: '#f1f5f9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3b82f6',
        flexShrink: 0
    },
    featureItemTitle: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '0.5rem'
    },
    featureItemText: {
        color: '#64748b',
        lineHeight: '1.5'
    },
    featuresVisual: {
        display: 'flex',
        justifyContent: 'center'
    },
    visualCard: {
        width: '300px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0'
    },
    visualHeader: {
        marginBottom: '1rem'
    },
    visualContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    chart: {
        display: 'flex',
        alignItems: 'end',
        gap: '0.5rem',
        height: '100px'
    },
    chartBar: {
        flex: 1,
        backgroundColor: '#3b82f6',
        borderRadius: '2px',
        minHeight: '20px'
    },
    metrics: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
    },
    metric: {
        textAlign: 'center'
    },
    metricValue: {
        display: 'block',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1e293b'
    },
    metricLabel: {
        display: 'block',
        fontSize: '0.75rem',
        color: '#64748b'
    },
    testimonials: {
        padding: '5rem 0',
        backgroundColor: '#f8fafc'
    },
    testimonialContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
    },
    testimonialCard: {
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    testimonialContent: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    stars: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.25rem',
        marginBottom: '1.5rem',
        color: '#fbbf24'
    },
    testimonialText: {
        fontSize: '1.125rem',
        lineHeight: '1.6',
        color: '#1e293b',
        fontStyle: 'italic',
        marginBottom: '1.5rem'
    },
    testimonialAuthor: {
        display: 'flex',
        justifyContent: 'center'
    },
    authorInfo: {
        textAlign: 'center'
    },
    authorName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#1e293b'
    },
    authorRole: {
        fontSize: '0.875rem',
        color: '#64748b'
    },
    authorCompany: {
        fontSize: '0.875rem',
        color: '#64748b'
    },
    testimonialDots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    cta: {
        padding: '5rem 0',
        backgroundColor: '#1e293b',
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
        fontSize: '2.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    ctaSubtitle: {
        fontSize: '1.125rem',
        marginBottom: '2rem',
        color: '#94a3b8'
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
        backgroundColor: '#3b82f6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'all 0.2s ease'
    },
    ctaSecondaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        border: '1px solid #374151',
        transition: 'all 0.2s ease'
    }
};

// Add CSS animations and hover effects
const hoverStyles = `
.service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.primary-button:hover {
    background-color: #0f172a;
}

.secondary-button:hover {
    background-color: #f8fafc;
    border-color: #1e293b;
}

.service-button:hover {
    background-color: #3b82f6;
    color: white;
}

.cta-primary-button:hover {
    background-color: #2563eb;
}

.cta-secondary-button:hover {
    background-color: white;
    color: #1e293b;
}

@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        text-align: center;
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
    
    .hero-title {
        font-size: 2rem !important;
    }
    
    .section-title {
        font-size: 1.875rem !important;
    }
}

.preview-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d1d5db;
}

.preview-dots span:first-child {
    background-color: #ef4444;
}

.preview-dots span:nth-child(2) {
    background-color: #f59e0b;
}

.preview-dots span:nth-child(3) {
    background-color: #10b981;
}

.chart-bar {
    height: 60px;
}

.chart-bar:nth-child(1) { height: 48px; }
.chart-bar:nth-child(2) { height: 36px; }
.chart-bar:nth-child(3) { height: 54px; }
.chart-bar:nth-child(4) { height: 42px; }
.chart-bar:nth-child(5) { height: 51px; }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = hoverStyles;
    document.head.appendChild(styleSheet);
}

export default ProfessionalHomePage;
