// client/src/components/ConfirmationModal.jsx
import React, { useEffect } from 'react';
import ExitIcon from './ExitIcon'; // Import our new icon

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    // Effect to add animation class when the modal opens
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.iconContainer}>
                    <ExitIcon size={32} />
                </div>
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.message}>{message}</p>
                <div style={styles.buttonContainer}>
                    <button onClick={onClose} style={{...styles.button, ...styles.cancelButton}}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} style={{...styles.button, ...styles.confirmButton}}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(5px)',
    },
    modal: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease-out',
        border: '1px solid #eee',
    },
    iconContainer: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#fee2e2', // Light red background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 1rem',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1a202c',
    },
    message: {
        color: '#4a5568',
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '2rem',
        marginTop: '0.5rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    button: {
        padding: '0.8rem 1.8rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    cancelButton: {
        backgroundColor: '#e2e8f0',
        color: '#4a5568',
    },
    confirmButton: {
        backgroundColor: '#e53e3e', // A slightly softer, modern red
        color: 'white',
    }
};

// Add keyframes for the animation to the document's head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`;
document.head.appendChild(styleSheet);


export default ConfirmationModal;