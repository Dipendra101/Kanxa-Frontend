// client/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import loginAnimation from '../animations/Login.json';
import { useAuth } from '../context/AuthContext'; // <-- IMPORT useAuth

// Custom hook to get window size
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

const Login = () => {
    const { login } = useAuth(); // <-- USE the login function from context
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password) {
            toast.error('All fields are required.');
            setLoading(false);
            return;
        }
        
        const toastId = toast.loading('Logging you in...');

        try {
            const response = await axios.post('http://localhost:5050/api/auth/login', formData);
            
            login(response.data.token); // <-- Use context's login function
            
            toast.success('Logged in successfully!', { id: toastId });
            
            setLoading(false);
            setTimeout(() => {
                navigate('/dashboard'); // Redirect to the new generic dashboard route
            }, 1500);

        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage, { id: toastId });
        }
    };

    const dynamicStyles = {
        container: { flexDirection: isMobile ? 'column' : 'row' },
        animationContainer: { display: isMobile ? 'none' : 'flex' },
        formWrapper: { padding: isMobile ? '2rem' : '3rem 4rem' }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div style={styles.pageContainer}>
                <div style={{...styles.container, ...dynamicStyles.container}}>
                    <div style={{...styles.animationContainer, ...dynamicStyles.animationContainer}}>
                        <Lottie animationData={loginAnimation} loop={true} />
                    </div>
                    <div style={{...styles.formWrapper, ...dynamicStyles.formWrapper}}>
                        <h2 style={styles.title}>Welcome Back</h2>
                        <p style={styles.subtitle}>Log in to continue to Kanxa Safari.</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={styles.inputGroup}>
                                <label htmlFor="email" style={styles.label}>Email Address</label>
                                <input type="email" name="email" id="email" style={styles.input} value={formData.email} onChange={handleChange} required />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="password" style={styles.label}>Password</label>
                                <div style={styles.passwordWrapper}>
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" style={styles.input} value={formData.password} onChange={handleChange} required />
                                    <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </span>
                                </div>
                            </div>
                            <button type="submit" style={styles.button} disabled={loading}>
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                        </form>

                        <p style={styles.footerText}>
                            Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    pageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '1rem' },
    container: { display: 'flex', maxWidth: '1000px', width: '100%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden' },
    animationContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eef5ff' },
    formWrapper: { flex: 1 },
    title: { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem', color: '#333' },
    subtitle: { textAlign: 'center', color: '#666', marginBottom: '2rem' },
    inputGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#444' },
    input: { width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
    passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    eyeIcon: { position: 'absolute', right: '1rem', cursor: 'pointer', userSelect: 'none' },
    button: { width: '100%', padding: '1rem', border: 'none', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' },
    footerText: { marginTop: '2rem', textAlign: 'center', color: '#666' },
    link: { color: '#007bff', textDecoration: 'none', fontWeight: '500' }
};

export default Login;