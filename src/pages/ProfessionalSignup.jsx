import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';

const ProfessionalSignup = () => {
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            const mockToken = 'mock-jwt-token-new-user-' + Date.now();
            login(mockToken);
            toast.success('Account created successfully');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: '', color: '#e5e7eb' };
        
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { strength: 0, text: '', color: '#e5e7eb' },
            { strength: 20, text: 'Very Weak', color: '#ef4444' },
            { strength: 40, text: 'Weak', color: '#f97316' },
            { strength: 60, text: 'Good', color: '#eab308' },
            { strength: 80, text: 'Strong', color: '#22c55e' },
            { strength: 100, text: 'Very Strong', color: '#16a34a' }
        ];

        return levels[score] || levels[0];
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            <div style={styles.content}>
                {/* Left Side - Company Benefits */}
                <div style={styles.leftSide}>
                    <div style={styles.brandingContent}>
                        <Link to="/" style={styles.logo}>
                            <div style={styles.logoIcon}>K</div>
                            <span style={styles.logoText}>Kanxa Safari</span>
                        </Link>
                        
                        <div style={styles.hero}>
                            <h1 style={styles.heroTitle}>Join Kanxa Safari</h1>
                            <p style={styles.heroSubtitle}>
                                Create your business account to access our integrated platform 
                                for transportation, construction, and workshop services.
                            </p>
                        </div>

                        <div style={styles.benefits}>
                            <h3 style={styles.benefitsTitle}>What you'll get:</h3>
                            
                            <div style={styles.benefit}>
                                <div style={styles.benefitIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div style={styles.benefitContent}>
                                    <h4>Unified Dashboard</h4>
                                    <p>Manage all services from a single, integrated platform</p>
                                </div>
                            </div>

                            <div style={styles.benefit}>
                                <div style={styles.benefitIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div style={styles.benefitContent}>
                                    <h4>Real-time Operations</h4>
                                    <p>Live tracking and instant updates on all your orders</p>
                                </div>
                            </div>

                            <div style={styles.benefit}>
                                <div style={styles.benefitIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div style={styles.benefitContent}>
                                    <h4>24/7 Support</h4>
                                    <p>Round-the-clock customer service and technical support</p>
                                </div>
                            </div>

                            <div style={styles.benefit}>
                                <div style={styles.benefitIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7.5 4.21L12 6.81L16.5 4.21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7.5 19.79V14.6L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 12L16.5 14.6V19.79" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 22.08V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div style={styles.benefitContent}>
                                    <h4>Secure Transactions</h4>
                                    <p>Enterprise-grade security for all your business operations</p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.stats}>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>50,000+</div>
                                <div style={styles.statLabel}>Active Users</div>
                            </div>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>15+ Years</div>
                                <div style={styles.statLabel}>Experience</div>
                            </div>
                            <div style={styles.stat}>
                                <div style={styles.statNumber}>99.9%</div>
                                <div style={styles.statLabel}>Uptime</div>
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
                                Step {currentStep} of 2 - {currentStep === 1 ? 'Basic Information' : 'Security Setup'}
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
                                            placeholder="Enter your business email"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        style={styles.nextButton}
                                    >
                                        <span>Continue</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label} htmlFor="phone">
                                            Phone Number
                                        </label>
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
                                                placeholder="Create a secure password"
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
                                        <div style={styles.passwordWrapper}>
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
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    {showConfirmPassword ? (
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
                                        {formData.confirmPassword && (
                                            <div style={styles.passwordMatch}>
                                                {formData.password === formData.confirmPassword ? (
                                                    <span style={{color: '#22c55e', fontSize: '0.8rem'}}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline', marginRight: '0.25rem'}}>
                                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        Passwords match
                                                    </span>
                                                ) : (
                                                    <span style={{color: '#ef4444', fontSize: '0.8rem'}}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline', marginRight: '0.25rem'}}>
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                                                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                                                        </svg>
                                                        Passwords don't match
                                                    </span>
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
                                                <Link to="/terms" style={styles.link}>Terms of Service</Link>
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
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Back
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
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
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
        marginBottom: '2rem'
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
        marginBottom: '2rem'
    },
    heroTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2',
        color: 'white'
    },
    heroSubtitle: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#94a3b8',
        fontWeight: '400'
    },
    benefits: {
        marginBottom: '2rem'
    },
    benefitsTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: 'white'
    },
    benefit: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        marginBottom: '1rem'
    },
    benefitIcon: {
        width: '32px',
        height: '32px',
        backgroundColor: '#3b82f6',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexShrink: 0
    },
    benefitContent: {
        flex: 1
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    stat: {
        textAlign: 'center'
    },
    statNumber: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem',
        color: 'white'
    },
    statLabel: {
        fontSize: '0.75rem',
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
        fontSize: '0.875rem',
        marginBottom: '1rem'
    },
    progressBar: {
        width: '100%',
        height: '3px',
        backgroundColor: '#e5e7eb',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: '2px',
        transition: 'width 0.3s ease'
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
    passwordStrength: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginTop: '0.5rem'
    },
    strengthBar: {
        flex: 1,
        height: '3px',
        backgroundColor: '#e5e7eb',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    strengthFill: {
        height: '100%',
        borderRadius: '2px',
        transition: 'all 0.3s ease'
    },
    strengthText: {
        fontSize: '0.75rem',
        fontWeight: '500'
    },
    passwordMatch: {
        marginTop: '0.5rem'
    },
    checkboxGroup: {
        margin: '0.5rem 0'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.8rem',
        lineHeight: '1.4'
    },
    checkbox: {
        width: '14px',
        height: '14px',
        marginTop: '2px',
        flexShrink: 0
    },
    checkboxText: {
        color: '#374151'
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '500'
    },
    nextButton: {
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
    buttonGroup: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '1rem'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.875rem',
        background: 'white',
        color: '#64748b',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
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
    loginLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

// Add hover effects and animations with comprehensive responsive design
const hoverStyles = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.input:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

.next-button:hover, .submit-button:hover {
    background-color: #0f172a !important;
}

.back-button:hover {
    border-color: #3b82f6 !important;
    color: #3b82f6 !important;
    background-color: #f8fafc !important;
}

/* Responsive breakpoints */

/* Large tablets and small desktops */
@media (max-width: 1024px) {
    .content {
        min-height: 100vh !important;
    }

    .left-side {
        padding: 2.5rem !important;
    }

    .branding-content {
        max-width: 450px !important;
    }

    .hero-title {
        font-size: 2.25rem !important;
    }

    .hero-subtitle {
        font-size: 1rem !important;
    }

    .benefit h3 {
        font-size: 1rem !important;
    }

    .benefit p {
        font-size: 0.875rem !important;
    }
}

/* Tablets and mobile landscape */
@media (max-width: 968px) {
    .content {
        flex-direction: column !important;
        min-height: 100vh !important;
    }

    .left-side {
        min-height: 45vh !important;
        padding: 2rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .branding-content {
        max-width: 100% !important;
        text-align: center !important;
    }

    .logo {
        justify-content: center !important;
        margin-bottom: 2rem !important;
    }

    .hero-title {
        font-size: 2rem !important;
    }

    .hero-subtitle {
        font-size: 0.95rem !important;
    }

    .benefits {
        gap: 1rem !important;
    }

    .benefit {
        text-align: center !important;
    }

    .testimonials {
        margin-top: 1.5rem !important;
    }

    .right-side {
        flex: 2 !important;
        padding: 2rem 1.5rem !important;
        min-height: 55vh !important;
    }

    .form-container {
        max-width: 450px !important;
        margin: 0 auto !important;
    }

    .form-title {
        font-size: 1.625rem !important;
    }

    .button-group {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
    }

    .back-button {
        order: 2;
    }

    .submit-button, .next-button {
        order: 1;
    }
}

/* Mobile devices */
@media (max-width: 768px) {
    .container {
        min-height: 100vh !important;
    }

    .content {
        flex-direction: column !important;
        min-height: 100vh !important;
    }

    .left-side {
        min-height: 40vh !important;
        padding: 1.5rem !important;
    }

    .branding-content {
        text-align: center !important;
    }

    .logo {
        margin-bottom: 1.5rem !important;
    }

    .logo-icon {
        width: 40px !important;
        height: 40px !important;
        font-size: 1.25rem !important;
    }

    .logo-text {
        font-size: 1.25rem !important;
    }

    .hero-title {
        font-size: 1.75rem !important;
        margin-bottom: 0.75rem !important;
    }

    .hero-subtitle {
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
    }

    .benefits {
        gap: 1rem !important;
        margin-bottom: 2rem !important;
    }

    .benefit {
        padding: 1rem !important;
        text-align: center !important;
    }

    .benefit-icon {
        width: 35px !important;
        height: 35px !important;
        margin: 0 auto 0.5rem !important;
    }

    .benefit h3 {
        font-size: 0.9rem !important;
        margin-bottom: 0.25rem !important;
    }

    .benefit p {
        font-size: 0.8rem !important;
    }

    .testimonials {
        margin-top: 1rem !important;
    }

    .testimonial {
        padding: 1rem !important;
    }

    .testimonial-content {
        font-size: 0.85rem !important;
        line-height: 1.5 !important;
        margin-bottom: 0.75rem !important;
    }

    .testimonial-author {
        font-size: 0.8rem !important;
    }

    .right-side {
        padding: 1.5rem !important;
        min-height: 60vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .form-container {
        width: 100% !important;
        max-width: 400px !important;
    }

    .form-title {
        font-size: 1.5rem !important;
    }

    .form-subtitle {
        font-size: 0.8rem !important;
    }

    .step-indicator {
        gap: 0.75rem !important;
    }

    .step {
        width: 30px !important;
        height: 30px !important;
        font-size: 0.8rem !important;
    }

    .step-label {
        font-size: 0.7rem !important;
    }

    .form {
        gap: 1rem !important;
    }

    .input-group {
        gap: 0.4rem !important;
    }

    .label {
        font-size: 0.8rem !important;
    }

    .input {
        padding: 0.6rem 0.875rem !important;
        font-size: 0.8rem !important;
    }

    .password-strength {
        gap: 0.25rem !important;
    }

    .strength-bar {
        height: 3px !important;
    }

    .strength-text {
        font-size: 0.7rem !important;
    }

    .checkbox-label {
        font-size: 0.75rem !important;
    }

    .button-group {
        grid-template-columns: 1fr !important;
        gap: 0.5rem !important;
    }

    .next-button, .submit-button, .back-button {
        padding: 0.75rem 1.25rem !important;
        font-size: 0.8rem !important;
    }

    .footer-text {
        font-size: 0.75rem !important;
    }
}

/* Small mobile devices */
@media (max-width: 480px) {
    .left-side {
        min-height: 35vh !important;
        padding: 1rem !important;
    }

    .hero-title {
        font-size: 1.5rem !important;
    }

    .hero-subtitle {
        font-size: 0.85rem !important;
    }

    .benefit {
        padding: 0.75rem !important;
    }

    .benefit h3 {
        font-size: 0.8rem !important;
    }

    .benefit p {
        font-size: 0.75rem !important;
    }

    .testimonial {
        padding: 0.75rem !important;
    }

    .testimonial-content {
        font-size: 0.8rem !important;
    }

    .right-side {
        padding: 1rem !important;
        min-height: 65vh !important;
    }

    .form-container {
        max-width: 100% !important;
    }

    .form-title {
        font-size: 1.375rem !important;
    }

    .step-indicator {
        margin-bottom: 1.5rem !important;
    }

    .step {
        width: 28px !important;
        height: 28px !important;
        font-size: 0.75rem !important;
    }

    .step-label {
        font-size: 0.65rem !important;
    }

    .form {
        gap: 0.875rem !important;
    }

    .label {
        font-size: 0.75rem !important;
    }

    .input {
        padding: 0.5rem 0.75rem !important;
        font-size: 0.75rem !important;
    }

    .password-wrapper svg {
        width: 14px !important;
        height: 14px !important;
    }

    .strength-text {
        font-size: 0.65rem !important;
    }

    .checkbox {
        width: 12px !important;
        height: 12px !important;
    }

    .checkbox-label {
        font-size: 0.7rem !important;
    }

    .next-button, .submit-button, .back-button {
        padding: 0.65rem 1rem !important;
        font-size: 0.75rem !important;
    }

    .footer-text {
        font-size: 0.7rem !important;
    }
}

/* Extra small devices */
@media (max-width: 360px) {
    .left-side {
        min-height: 30vh !important;
        padding: 0.75rem !important;
    }

    .logo-icon {
        width: 35px !important;
        height: 35px !important;
        font-size: 1rem !important;
    }

    .logo-text {
        font-size: 1.1rem !important;
    }

    .hero-title {
        font-size: 1.375rem !important;
    }

    .benefits {
        display: none !important;
    }

    .testimonials {
        display: none !important;
    }

    .right-side {
        padding: 0.75rem !important;
        min-height: 70vh !important;
    }

    .form-header {
        margin-bottom: 1.5rem !important;
    }

    .step-indicator {
        margin-bottom: 1rem !important;
    }

    .form {
        gap: 0.75rem !important;
    }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = hoverStyles;
    document.head.appendChild(styleSheet);
}

export default ProfessionalSignup;
