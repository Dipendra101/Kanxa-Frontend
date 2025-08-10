// client/src/pages/GaragePage.jsx
import React, { useState } from 'react';
import { createServiceRequest } from '../api/garageApi';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const GaragePage = () => {
    const [formData, setFormData] = useState({
        vehicleType: 'Tractor',
        serviceDescription: '',
        preferredDate: '',
        contactNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please log in to submit a service request.");
            return navigate('/login');
        }
        if (!formData.vehicleType || !formData.serviceDescription || !formData.contactNumber) {
            return toast.error("Please fill out all required fields.");
        }
        setLoading(true);
        const toastId = toast.loading("Submitting your request...");

        try {
            await createServiceRequest(formData);
            toast.success("Request submitted successfully! We will contact you shortly.", { id: toastId });
            setTimeout(() => navigate('/my-requests'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit request.", { id: toastId });
        }
        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <Toaster position="top-center" />
            <header style={styles.header}>
                <h1>Garage & Workshop</h1>
                <p>Your one-stop solution for expert repairs and quality parts.</p>
            </header>

            <div style={styles.container}>
                {/* Service Request Section */}
                <div style={styles.section}>
                    <h2>Request a Service</h2>
                    <p>Need expert help? Fill out the form below to book a service appointment for your machinery.</p>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields are the same as before */}
                        <div style={styles.inputGrid}>
                             <div style={styles.inputGroup}>
                                <label>Vehicle Type</label>
                                <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} style={styles.input} required />
                            </div>
                            <div style={styles.inputGroup}>
                                <label>Contact Number</label>
                                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} style={styles.input} required />
                            </div>
                        </div>
                         <div style={styles.inputGroup}>
                            <label>Preferred Date (Optional)</label>
                            <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Describe the Service Needed</label>
                            <textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} style={styles.textarea} rows="4" required />
                        </div>
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? "Submitting..." : "Submit Service Request"}
                        </button>
                    </form>
                </div>

                {/* Shop for Parts Section */}
                <div style={{...styles.section, ...styles.shopSection}}>
                     <h2>Shop for Tools & Parts</h2>
                     <p>Browse our extensive catalog of high-quality workshop tools, spare parts, and essentials.</p>
                     <p>From engine components to specialized tools, find everything you need to do the job right.</p>
                     <Link to="/garage/store" style={{...styles.button, ...styles.shopButton}}>
                        Browse the Store
                     </Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { backgroundColor: '#f4f7f6', minHeight: '100vh' },
    header: { textAlign: 'center', padding: '3rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #e7e7e7' },
    container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' },
    section: { backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'},
    inputGroup: { marginBottom: '1.5rem' },
    input: { width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'inherit' },
    button: { width: '100%', padding: '1rem', textDecoration: 'none', textAlign: 'center', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', transition: 'background-color 0.3s' },
    shopSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(to right, #2c3e50, #4ca1af)' , color: '#fff'},
    shopButton: { marginTop: '1rem', backgroundColor: '#fff', color: '#2c3e50', fontWeight: 'bold' }
};

export default GaragePage;