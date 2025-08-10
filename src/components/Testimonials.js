// client/src/components/Testimonials.js
import React, { useState, useEffect } from 'react';
import '../styles/LandingPage.css';

const testimonialsData = [
    { quote: "The night bus from Lamjung was surprisingly comfortable. Booking online was a breeze.", name: "Aarav Sharma", location: "Kathmandu", avatar: "https://i.pravatar.cc/150?img=1" },
    { quote: "Kanxa Safari delivered all construction materials on time. The quality was top-notch.", name: "Priya Gurung", location: "Pokhara", avatar: "https://i.pravatar.cc/150?img=5" },
    { quote: "Stranded with a broken tractor, their garage team was a lifesaver. Fast and professional.", name: "Rajesh Thapa", location: "Gorkha", avatar: "https://i.pravatar.cc/150?img=8" },
    { quote: "We booked a private tour bus. The vehicle was clean, the driver was excellent. 10/10 service.", name: "Sunita Rai", location: "Butwal", avatar: "https://i.pravatar.cc/150?img=7" },
    { quote: "The best place for hardware supplies. They had everything I needed for my plumbing project.", name: "Bijay Lama", location: "Lamjung", avatar: "https://i.pravatar.cc/150?img=12" },
    { quote: "Their cargo service is reliable. My goods always arrive safely and on schedule.", name: "Anjali KC", location: "Kathmandu", avatar: "https://i.pravatar.cc/150?img=20" },
    { quote: "I appreciate the quality of their rebar and cement. It gives me peace of mind for my construction.", name: "Manish Koirala", location: "Chitwan", avatar: "https://i.pravatar.cc/150?img=33" },
    { quote: "The mechanics at Kanxa's garage are true experts. They diagnosed a complex engine issue quickly.", name: "Harka Sampang", location: "Pokhara", avatar: "https://i.pravatar.cc/150?img=45" },
    { quote: "Their customer service for booking is fantastic. Very helpful and patient.", name: "Deepika Shrestha", location: "Biratnagar", avatar: "https://i.pravatar.cc/150?img=31" },
    { quote: "Affordable prices for both travel and construction materials. My go-to company in the region.", name: "Prabin Adhikari", location: "Lamjung", avatar: "https://i.pravatar.cc/150?img=56" },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonialsData.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section style={styles.testimonialsSection}>
            <div style={styles.container}>
                <h2 style={styles.heading}>What Our Customers Say</h2>
                <p style={styles.subheading}>Real stories from people we've had the pleasure to serve.</p>
                <div style={styles.sliderContainer}>
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}>
                            <p style={styles.quote}>"{testimonial.quote}"</p>
                            <div style={styles.authorInfo}>
                                <img src={testimonial.avatar} alt={testimonial.name} style={styles.avatar} />
                                <div>
                                    <h4 style={styles.authorName}>{testimonial.name}</h4>
                                    <p style={styles.authorLocation}>{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    testimonialsSection: { padding: '4rem 2rem', backgroundColor: '#f9fafb' },
    container: { maxWidth: '800px', margin: '0 auto', textAlign: 'center' },
    heading: { fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' },
    subheading: { fontSize: '1.1rem', color: '#666', marginBottom: '3rem' },
    sliderContainer: { position: 'relative', minHeight: '250px' },
    quote: { fontSize: '1.2rem', color: '#555', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '2rem' },
    authorInfo: { display: 'inline-flex', alignItems: 'center', gap: '1rem' },
    avatar: { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    authorName: { margin: 0, fontWeight: 'bold', color: '#333', fontSize: '1.1rem' },
    authorLocation: { margin: 0, color: '#777', fontSize: '0.9rem' }
};

export default Testimonials;