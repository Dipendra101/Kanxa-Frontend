// client/src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import OurOfferings from '../components/OurOfferings';
import WhyChooseUs from '../components/WhyChooseUs';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <WhyChooseUs />
            <OurOfferings />
            <About />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default HomePage;