import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';

const ModernSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        agreeToTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            toast.error('Please enter your full name');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Please enter your email address');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.password) {
            toast.error('Please enter a password');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        if (!formData.phone.trim()) {
            toast.error('Please enter your phone number');
            return false;
        }
        if (!formData.agreeToTerms) {
            toast.error('Please agree to the Terms and Conditions');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep2()) return;

        setIsLoading(true);

        try {
            // Mock signup - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock token - replace with actual token from API
            const mockToken = 'mock-jwt-token-new-user-' + Date.now();
            login(mockToken);
            
            toast.success('Account created successfully! Welcome to Kanxa Safari 🎉');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const benefits = [
        {
            icon: '🚌',
            title: 'Premium Transportation',
            description: 'Book luxury buses and cargo services with real-time tracking'
        },
        {
            icon: '🏗️',
            title: 'Quality Construction Supplies',
            description: 'Access to high-grade materials and machinery at competitive prices'
        },
        {
            icon: '🔧',
            title: 'Expert Workshop Services',
            description: 'Professional maintenance and repair for all your machinery'
        },
        {
            icon: '📱',
            title: 'Digital Dashboard',
            description: 'Manage all your bookings, orders, and requests from one place'
        },
        {
            icon: '💳',
            title: 'Secure Payments',
            description: 'Safe and secure payment processing with multiple options'
        },
        {
            icon: '🎯',
            title: '24/7 Support',
            description: 'Round-the-clock customer support for all your needs'
        }
    ];

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: '', color: '#e9ecef' };
        
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { strength: 0, text: '', color: '#e9ecef' },
            { strength: 20, text: 'Very Weak', color: '#e74c3c' },
            { strength: 40, text: 'Weak', color: '#f39c12' },
            { strength: 60, text: 'Good', color: '#f1c40f' },
            { strength: 80, text: 'Strong', color: '#27ae60' },
            { strength: 100, text: 'Very Strong', color: '#2ecc71' }
        ];

        return levels[score] || levels[0];
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Background */}
            <div style={styles.background}>
                <div style={styles.backgroundOverlay}></div>
                <div style={styles.patterns}></div>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {/* Left Side - Benefits */}
                <div style={styles.leftSide}>
                    <div style={styles.brandingContent}>
                        <Link to="/" style={styles.logo}>
                            <span style={styles.logoEmoji}>🐘</span>
                            <span style={styles.logoText}>Kanxa Safari</span>
                        </Link>
                        
                        <div style={styles.hero}>
                            <h1 style={styles.heroTitle}>Join Kanxa Safari</h1>
                            <p style={styles.heroSubtitle}>
                                Create your account and unlock access to premium transportation, 
                                construction supplies, and expert workshop services.
                            </p>
                        </div>

                        <div style={styles.benefits}>
                            <h3 style={styles.benefitsTitle}>What you'll get:</h3>
                            <div style={styles.benefitsList}>
                                {benefits.map((benefit, index) => (
                                    <div 
                                        key={index} 
                                        style={{
                                            ...styles.benefit,
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                        className="benefit-item"
                                    >
                                        <div style={styles.benefitIcon}>{benefit.icon}</div>
                                        <div style={styles.benefitContent}>
                                            <h4 style={styles.benefitTitle}>{benefit.title}</h4>
                                            <p style={styles.benefitDescription}>{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.stats}>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>50k+</div>
                                <div style={styles.statLabel}>Happy Customers</div>
                            </div>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>15+</div>
                                <div style={styles.statLabel}>Years Experience</div>
                            </div>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>99.9%</div>
                                <div style={styles.statLabel}>Reliability</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div style={styles.rightSide}>
                    <div style={styles.formContainer}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Create Account</h2>
                            <p style={styles.formSubtitle}>
                                Step {currentStep} of 2 - {currentStep === 1 ? 'Personal Information' : 'Security & Preferences'}
                            </p>
                            
                            {/* Progress Bar */}
                            <div style={styles.progressBar}>
                                <div 
                                    style={{
                                        ...styles.progressFill,
                                        width: `${(currentStep / 2) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            {currentStep === 1 ? (
                                <>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label} htmlFor="name">
                                            Full Name
                                        </label>
                                        <div style={styles.inputWrapper}>
                                            <span style={styles.inputIcon}>👤</span>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                style={styles.input}
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    </div>

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

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        style={styles.nextButton}
                                    >
                                        <span>Continue</span>
                                        <span style={styles.buttonIcon}>→</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label} htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <div style={styles.inputWrapper}>
                                            <span style={styles.inputIcon}>📱</span>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={styles.input}
                                                placeholder="+977-9876543210"
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
                                                placeholder="Create a strong password"
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
                                        {formData.password && (
                                            <div style={styles.passwordStrength}>
                                                <div style={styles.strengthBar}>
                                                    <div 
                                                        style={{
                                                            ...styles.strengthFill,
                                                            width: `${passwordStrength.strength}%`,
                                                            backgroundColor: passwordStrength.color
                                                        }}
                                                    ></div>
                                                </div>
                                                <span 
                                                    style={{
                                                        ...styles.strengthText,
                                                        color: passwordStrength.color
                                                    }}
                                                >
                                                    {passwordStrength.text}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.inputGroup}>
                                        <label style={styles.label} htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <div style={styles.inputWrapper}>
                                            <span style={styles.inputIcon}>🔒</span>
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                style={styles.input}
                                                placeholder="Confirm your password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={styles.eyeButton}
                                            >
                                                {showConfirmPassword ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                        {formData.confirmPassword && (
                                            <div style={styles.passwordMatch}>
                                                {formData.password === formData.confirmPassword ? (
                                                    <span style={{color: '#2ecc71'}}>✓ Passwords match</span>
                                                ) : (
                                                    <span style={{color: '#e74c3c'}}>✗ Passwords don't match</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.checkboxGroup}>
                                        <label style={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                style={styles.checkbox}
                                                required
                                            />
                                            <span style={styles.checkboxText}>
                                                I agree to the{' '}
                                                <Link to="/terms" style={styles.link}>Terms and Conditions</Link>
                                                {' '}and{' '}
                                                <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
                                            </span>
                                        </label>
                                    </div>

                                    <div style={styles.buttonGroup}>
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            style={styles.backButton}
                                        >
                                            ← Back
                                        </button>
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
                                                    Creating Account...
                                                </div>
                                            ) : (
                                                <>
                                                    <span>Create Account</span>
                                                    <span style={styles.buttonIcon}>✓</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>

                        <div style={styles.footer}>
                            <p style={styles.footerText}>
                                Already have an account?{' '}
                                <Link to="/login" style={styles.loginLink}>
                                    Sign In
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
        position: 'relative',
        overflow: 'hidden'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)'
    },
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.1)'
    },
    patterns: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
        opacity: 0.5
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
        marginBottom: '2rem'
    },
    logoEmoji: {
        fontSize: '2.5rem'
    },
    logoText: {
        fontSize: '1.8rem',
        fontWeight: 'bold'
    },
    hero: {
        marginBottom: '2rem'
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        opacity: 0.9
    },
    benefits: {
        marginBottom: '2rem'
    },
    benefitsTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    benefitsList: {
        display: 'grid',
        gap: '1rem'
    },
    benefit: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        animation: 'slideInLeft 0.6s ease-out forwards'
    },
    benefitIcon: {
        fontSize: '1.5rem',
        minWidth: '40px',
        textAlign: 'center'
    },
    benefitContent: {
        flex: 1
    },
    benefitTitle: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
    },
    benefitDescription: {
        fontSize: '0.85rem',
        opacity: 0.9,
        lineHeight: '1.4'
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)'
    },
    stat: {
        textAlign: 'center'
    },
    statNumber: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
    },
    statLabel: {
        fontSize: '0.8rem',
        opacity: 0.9
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
        fontSize: '0.9rem',
        marginBottom: '1rem'
    },
    progressBar: {
        width: '100%',
        height: '4px',
        backgroundColor: '#e9ecef',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #ff6b6b, #feca57)',
        borderRadius: '2px',
        transition: 'width 0.3s ease'
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
    passwordStrength: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginTop: '0.5rem'
    },
    strengthBar: {
        flex: 1,
        height: '4px',
        backgroundColor: '#e9ecef',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    strengthFill: {
        height: '100%',
        borderRadius: '2px',
        transition: 'all 0.3s ease'
    },
    strengthText: {
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    passwordMatch: {
        marginTop: '0.5rem',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    checkboxGroup: {
        margin: '0.5rem 0'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        lineHeight: '1.4'
    },
    checkbox: {
        width: '16px',
        height: '16px',
        marginTop: '2px',
        flexShrink: 0
    },
    checkboxText: {
        color: '#495057'
    },
    link: {
        color: '#ff6b6b',
        textDecoration: 'none',
        fontWeight: '500'
    },
    nextButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
    },
    buttonGroup: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '1rem'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'white',
        color: '#7f8c8d',
        border: '2px solid #e9ecef',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
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
        fontSize: '0.9rem'
    },
    loginLink: {
        color: '#ff6b6b',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

// Add CSS animations
const animationStyles = `
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.benefit-item {
    opacity: 0;
    animation: slideInLeft 0.6s ease-out forwards;
}

.input:focus {
    border-color: #ff6b6b !important;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
}

.next-button:hover, .submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.next-button:hover .button-icon, .submit-button:hover .button-icon {
    transform: translateX(5px);
}

.back-button:hover {
    border-color: #ff6b6b !important;
    color: #ff6b6b !important;
    background-color: #fff5f5 !important;
}

.benefit:hover {
    transform: translateX(10px);
    background-color: rgba(255,255,255,0.15) !important;
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
    
    .button-group {
        grid-template-columns: 1fr !important;
    }
    
    .back-button {
        order: 2;
    }
    
    .submit-button {
        order: 1;
    }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

export default ModernSignup;
