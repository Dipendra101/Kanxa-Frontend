// client/src/pages/HomePage.js

import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <Services />
            {/* You can add more sections like testimonials, etc. here later */}
        </div>
    );
};

export default HomePage;