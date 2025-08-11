import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';

const ModernLogin = () => {
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
            // Mock login - replace with actual API call
            if (formData.email && formData.password) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock token - replace with actual token from API
                const mockToken = 'mock-jwt-token-' + Date.now();
                login(mockToken);
                
                toast.success('Login successful! Welcome back 🎉');
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
        toast.success(`Demo ${account.type} credentials filled!`);
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Background */}
            <div style={styles.background}>
                <div style={styles.backgroundOverlay}></div>
                <div style={styles.shapes}>
                    <div style={styles.shape1}></div>
                    <div style={styles.shape2}></div>
                    <div style={styles.shape3}></div>
                </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {/* Left Side - Branding */}
                <div style={styles.leftSide}>
                    <div style={styles.brandingContent}>
                        <Link to="/" style={styles.logo}>
                            <span style={styles.logoEmoji}>🐘</span>
                            <span style={styles.logoText}>Kanxa Safari</span>
                        </Link>
                        
                        <div style={styles.hero}>
                            <h1 style={styles.heroTitle}>Welcome Back!</h1>
                            <p style={styles.heroSubtitle}>
                                Sign in to access your dashboard and manage your transportation, 
                                construction, and garage services seamlessly.
                            </p>
                        </div>

                        <div style={styles.features}>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>🚌</div>
                                <div style={styles.featureContent}>
                                    <h3>Transportation</h3>
                                    <p>Book buses and cargo services</p>
                                </div>
                            </div>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>🏗️</div>
                                <div style={styles.featureContent}>
                                    <h3>Construction</h3>
                                    <p>Quality materials & machinery</p>
                                </div>
                            </div>
                            <div style={styles.feature}>
                                <div style={styles.featureIcon}>🔧</div>
                                <div style={styles.featureContent}>
                                    <h3>Workshop</h3>
                                    <p>Expert maintenance services</p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.testimonial}>
                            <div style={styles.testimonialContent}>
                                <div style={styles.quote}>"</div>
                                <p style={styles.testimonialText}>
                                    Kanxa Safari has transformed how we manage our logistics. 
                                    The digital platform is incredibly user-friendly.
                                </p>
                                <div style={styles.testimonialAuthor}>
                                    <div style={styles.authorAvatar}>👨‍💼</div>
                                    <div>
                                        <div style={styles.authorName}>Rajesh Sharma</div>
                                        <div style={styles.authorTitle}>Business Owner</div>
                                    </div>
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
                            <p style={styles.demoTitle}>Quick Demo Access:</p>
                            <div style={styles.demoButtons}>
                                {demoAccounts.map((account, index) => (
                                    <button
                                        key={index}
                                        onClick={() => fillDemoData(account)}
                                        style={styles.demoButton}
                                        type="button"
                                    >
                                        <span style={styles.demoIcon}>
                                            {account.type === 'Admin' ? '⚙️' : '👤'}
                                        </span>
                                        Demo {account.type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={styles.divider}>
                            <span style={styles.dividerText}>or sign in with email</span>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="email">
                                    Email Address
                                </label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.inputIcon}>📧</span>
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
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="password">
                                    Password
                                </label>
                                <div style={styles.inputWrapper}>
                                    <span style={styles.inputIcon}>🔒</span>
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
                                        {showPassword ? '🙈' : '👁️'}
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
                                        <span style={styles.buttonIcon}>→</span>
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
                            
                            <div style={styles.socialLogin}>
                                <p style={styles.socialTitle}>Or continue with</p>
                                <div style={styles.socialButtons}>
                                    <button style={styles.socialButton} type="button">
                                        <span style={styles.socialIcon}>🔵</span>
                                        Google
                                    </button>
                                    <button style={styles.socialButton} type="button">
                                        <span style={styles.socialIcon}>📘</span>
                                        Facebook
                                    </button>
                                </div>
                            </div>
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
        position: 'relative',
        overflow: 'hidden'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.1)'
    },
    shapes: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
    },
    shape1: {
        position: 'absolute',
        top: '-50%',
        left: '-10%',
        width: '120%',
        height: '120%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        animation: 'float 8s ease-in-out infinite'
    },
    shape2: {
        position: 'absolute',
        bottom: '-30%',
        right: '-15%',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        animation: 'float 10s ease-in-out infinite reverse'
    },
    shape3: {
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '30%',
        height: '30%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        animation: 'float 6s ease-in-out infinite'
    },
    content: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
        zIndex: 1
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        color: 'white'
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
    logoEmoji: {
        fontSize: '2.5rem'
    },
    logoText: {
        fontSize: '1.8rem',
        fontWeight: 'bold'
    },
    hero: {
        marginBottom: '3rem'
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        opacity: 0.9
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)'
    },
    featureIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    featureContent: {
        flex: 1
    },
    testimonial: {
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
    },
    testimonialContent: {
        position: 'relative'
    },
    quote: {
        fontSize: '4rem',
        color: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        top: '-1rem',
        left: '-0.5rem'
    },
    testimonialText: {
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        fontStyle: 'italic'
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    authorAvatar: {
        fontSize: '2rem'
    },
    authorName: {
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    authorTitle: {
        fontSize: '0.9rem',
        opacity: 0.8
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)'
    },
    formContainer: {
        width: '100%',
        maxWidth: '450px'
    },
    formHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    formTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    formSubtitle: {
        color: '#7f8c8d',
        fontSize: '1rem'
    },
    demoSection: {
        marginBottom: '1.5rem'
    },
    demoTitle: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginBottom: '0.75rem',
        textAlign: 'center'
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
        border: '2px solid #e9ecef',
        borderRadius: '10px',
        backgroundColor: 'white',
        color: '#495057',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    demoIcon: {
        fontSize: '1rem'
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '1.5rem 0',
        position: 'relative'
    },
    dividerText: {
        background: 'rgba(255,255,255,0.95)',
        padding: '0 1rem',
        fontSize: '0.85rem',
        color: '#7f8c8d',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#2c3e50'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        fontSize: '1rem',
        zIndex: 1
    },
    input: {
        width: '100%',
        padding: '1rem 1rem 1rem 3rem',
        border: '2px solid #e9ecef',
        borderRadius: '12px',
        fontSize: '1rem',
        backgroundColor: 'white',
        transition: 'all 0.3s ease',
        outline: 'none'
    },
    eyeButton: {
        position: 'absolute',
        right: '1rem',
        background: 'none',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0.25rem'
    },
    formOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer'
    },
    checkbox: {
        width: '16px',
        height: '16px'
    },
    checkboxText: {
        color: '#495057'
    },
    forgotLink: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '500'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    loadingContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    buttonIcon: {
        fontSize: '1.2rem',
        transition: 'transform 0.3s ease'
    },
    footer: {
        marginTop: '2rem',
        textAlign: 'center'
    },
    footerText: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
        marginBottom: '1.5rem'
    },
    signupLink: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '600'
    },
    socialLogin: {
        borderTop: '1px solid #e9ecef',
        paddingTop: '1.5rem'
    },
    socialTitle: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
        marginBottom: '1rem'
    },
    socialButtons: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem'
    },
    socialButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#495057',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    socialIcon: {
        fontSize: '1rem'
    }
};

// Add CSS animations
const animationStyles = `
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.demo-button:hover {
    border-color: #667eea !important;
    background-color: #f8f9ff !important;
    transform: translateY(-2px);
}

.input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.submit-button:hover .button-icon {
    transform: translateX(5px);
}

.social-button:hover {
    border-color: #667eea !important;
    background-color: #f8f9ff !important;
    transform: translateY(-1px);
}

.feature {
    transition: transform 0.3s ease;
}

.feature:hover {
    transform: translateX(10px);
}

@media (max-width: 968px) {
    .content {
        grid-template-columns: 1fr !important;
    }
    
    .left-side {
        display: none !important;
    }
    
    .right-side {
        background: rgba(255,255,255,0.98) !important;
    }
}

::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.03) 50%, transparent 51%);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

export default ModernLogin;
