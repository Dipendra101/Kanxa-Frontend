import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';

const ProfessionalLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formData.email && formData.password) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                const mockToken = 'mock-jwt-token-' + Date.now();
                login(mockToken);
                toast.success('Login successful');
                navigate('/dashboard');
            } else {
                toast.error('Please fill in all fields');
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const demoAccounts = [
        { type: 'Admin', email: 'admin@kanxasafari.com', password: 'admin123' },
        { type: 'User', email: 'user@example.com', password: 'user123' }
    ];

    const fillDemoData = (account) => {
        setFormData({
            email: account.email,
            password: account.password
        });
        toast.success(`Demo ${account.type} credentials filled`);
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            <div style={styles.content}>
                {/* Left Side - Company Information */}
                <div style={styles.leftSide}>
                    <div style={styles.brandingContent}>
                        <Link to="/" style={styles.logo}>
                            <div style={styles.logoIcon}>K</div>
                            <span style={styles.logoText}>Kanxa Safari</span>
                        </Link>
                        
                        <div style={styles.hero}>
                            <h1 style={styles.heroTitle}>Welcome Back</h1>
                            <p style={styles.heroSubtitle}>
                                Access your business dashboard to manage transportation, 
                                construction supplies, and workshop services efficiently.
                            </p>
                        </div>

                        <div style={styles.features}>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 12L2 13L12 21L22 13L21 12L12 19L3 12Z" fill="currentColor"/>
                                        <path d="M3 7L12 15L21 7L12 1L3 7Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div style={styles.featureContent}>
                                    <h3>Transportation Fleet</h3>
                                    <p>Manage buses, cargo vehicles, and logistics operations</p>
                                </div>
                            </div>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div style={styles.featureContent}>
                                    <h3>Construction Materials</h3>
                                    <p>Quality building supplies and heavy machinery rental</p>
                                </div>
                            </div>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 1 5.1 3S1 8.9 3 10.9C4.9 12.8 7.6 13.3 9.9 12.4L19 21.7C19.4 22.1 20 22.1 20.4 21.7L22.7 19.4C23.1 19 23.1 18.4 22.7 19Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div style={styles.featureContent}>
                                    <h3>Workshop Services</h3>
                                    <p>Professional maintenance and repair solutions</p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.testimonial}>
                            <div style={styles.testimonialQuote}>
                                "Kanxa Safari's integrated platform has streamlined our entire logistics operation. Professional service with reliable results."
                            </div>
                            <div style={styles.testimonialAuthor}>
                                <div style={styles.authorInfo}>
                                    <div style={styles.authorName}>Rajesh Sharma</div>
                                    <div style={styles.authorTitle}>Operations Director, Himalayan Construction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div style={styles.rightSide}>
                    <div style={styles.formContainer}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Sign In</h2>
                            <p style={styles.formSubtitle}>
                                Enter your credentials to access your account
                            </p>
                        </div>

                        {/* Demo Accounts */}
                        <div style={styles.demoSection}>
                            <p style={styles.demoTitle}>Quick Access:</p>
                            <div style={styles.demoButtons}>
                                {demoAccounts.map((account, index) => (
                                    <button
                                        key={index}
                                        onClick={() => fillDemoData(account)}
                                        style={styles.demoButton}
                                        type="button"
                                    >
                                        <div style={styles.demoIcon}>
                                            {account.type === 'Admin' ? 'A' : 'U'}
                                        </div>
                                        Demo {account.type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={styles.divider}>
                            <span style={styles.dividerText}>or continue with email</span>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="password">
                                    Password
                                </label>
                                <div style={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.eyeButton}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {showPassword ? (
                                                <path d="M2 12C2 12 5 6 12 6S22 12 22 12 19 18 12 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            ) : (
                                                <>
                                                    <path d="M2 12C2 12 5 6 12 6S22 12 22 12 19 18 12 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"/>
                                                </>
                                            )}
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div style={styles.formOptions}>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" style={styles.checkbox} />
                                    <span style={styles.checkboxText}>Remember me</span>
                                </label>
                                <Link to="/forgot-password" style={styles.forgotLink}>
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    ...styles.submitButton,
                                    opacity: isLoading ? 0.7 : 1,
                                    cursor: isLoading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? (
                                    <div style={styles.loadingContent}>
                                        <div style={styles.spinner}></div>
                                        Signing In...
                                    </div>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div style={styles.footer}>
                            <p style={styles.footerText}>
                                Don't have an account?{' '}
                                <Link to="/signup" style={styles.signupLink}>
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f8fafc'
    },
    content: {
        display: 'flex',
        width: '100%',
        minHeight: '100vh'
    },
    leftSide: {
        flex: 1,
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    brandingContent: {
        maxWidth: '500px',
        width: '100%'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        textDecoration: 'none',
        color: 'white',
        marginBottom: '3rem'
    },
    logoIcon: {
        width: '48px',
        height: '48px',
        backgroundColor: '#3b82f6',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    hero: {
        marginBottom: '3rem'
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2',
        color: 'white'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#94a3b8',
        fontWeight: '400'
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    feature: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    featureIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: '#3b82f6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexShrink: 0
    },
    featureContent: {
        flex: 1
    },
    testimonial: {
        padding: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    testimonialQuote: {
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1rem',
        color: '#e2e8f0',
        fontStyle: 'italic'
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    authorInfo: {
        flex: 1
    },
    authorName: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: 'white'
    },
    authorTitle: {
        fontSize: '0.8rem',
        color: '#94a3b8'
    },
    rightSide: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'white'
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px'
    },
    formHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    formTitle: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '0.5rem'
    },
    formSubtitle: {
        color: '#64748b',
        fontSize: '0.875rem'
    },
    demoSection: {
        marginBottom: '1.5rem'
    },
    demoTitle: {
        fontSize: '0.8rem',
        color: '#64748b',
        marginBottom: '0.75rem',
        textAlign: 'center',
        fontWeight: '500'
    },
    demoButtons: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem'
    },
    demoButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#475569',
        fontSize: '0.8rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    demoIcon: {
        width: '20px',
        height: '20px',
        borderRadius: '4px',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        color: '#475569'
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '1.5rem 0',
        position: 'relative'
    },
    dividerText: {
        background: 'white',
        padding: '0 1rem',
        fontSize: '0.8rem',
        color: '#64748b',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151'
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '0.875rem',
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        outline: 'none'
    },
    passwordWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    eyeButton: {
        position: 'absolute',
        right: '0.75rem',
        background: 'none',
        border: 'none',
        color: '#64748b',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
    },
    checkbox: {
        width: '14px',
        height: '14px'
    },
    checkboxText: {
        color: '#374151'
    },
    forgotLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '500'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.875rem 1.5rem',
        backgroundColor: '#1e293b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    loadingContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    footer: {
        marginTop: '1.5rem',
        textAlign: 'center'
    },
    footerText: {
        color: '#64748b',
        fontSize: '0.8rem'
    },
    signupLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

// Add hover effects via CSS
const hoverStyles = `
.demo-button:hover {
    border-color: #3b82f6 !important;
    background-color: #f8fafc !important;
}

.input:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

.submit-button:hover {
    background-color: #0f172a !important;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@media (max-width: 968px) {
    .content {
        flex-direction: column !important;
    }
    
    .left-side {
        min-height: 40vh !important;
        padding: 2rem !important;
    }
    
    .right-side {
        flex: 2 !important;
    }
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e2e8f0;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = hoverStyles;
    document.head.appendChild(styleSheet);
}

export default ProfessionalLogin;
