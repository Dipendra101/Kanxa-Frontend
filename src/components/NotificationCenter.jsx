import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const NotificationCenter = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Mock notifications - in real app, this would come from API/WebSocket
        const mockNotifications = [
            {
                id: 1,
                type: user?.role === 'admin' ? 'booking' : 'booking_confirmed',
                title: user?.role === 'admin' ? 'New Booking Received' : 'Booking Confirmed',
                message: user?.role === 'admin' ? 
                    'New booking from John Doe for Kathmandu to Pokhara route' : 
                    'Your booking for Kathmandu to Pokhara has been confirmed',
                timestamp: new Date(Date.now() - 5 * 60 * 1000),
                read: false,
                priority: 'high'
            },
            {
                id: 2,
                type: user?.role === 'admin' ? 'payment' : 'payment_success',
                title: user?.role === 'admin' ? 'Payment Received' : 'Payment Successful',
                message: user?.role === 'admin' ? 
                    'Payment of NPR 2,400 received for booking BK001' : 
                    'Your payment of NPR 2,400 has been processed successfully',
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                read: false,
                priority: 'medium'
            },
            {
                id: 3,
                type: user?.role === 'admin' ? 'service_request' : 'service_approved',
                title: user?.role === 'admin' ? 'New Service Request' : 'Service Request Approved',
                message: user?.role === 'admin' ? 
                    'New tractor maintenance request submitted' : 
                    'Your tractor maintenance request has been approved',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: true,
                priority: 'low'
            },
            {
                id: 4,
                type: user?.role === 'admin' ? 'order' : 'order_shipped',
                title: user?.role === 'admin' ? 'New Order Placed' : 'Order Shipped',
                message: user?.role === 'admin' ? 
                    'Large cement order placed by Construction Co.' : 
                    'Your cement order has been shipped',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                read: true,
                priority: 'medium'
            },
            {
                id: 5,
                type: user?.role === 'admin' ? 'maintenance' : 'reminder',
                title: user?.role === 'admin' ? 'Vehicle Maintenance Due' : 'Travel Reminder',
                message: user?.role === 'admin' ? 
                    'Bus KTM-01 is due for maintenance in 3 days' : 
                    'Your trip to Pokhara is tomorrow at 7:00 AM',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                read: false,
                priority: 'medium'
            }
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (notificationId) => {
        setNotifications(notifications.map(notification => 
            notification.id === notificationId 
                ? { ...notification, read: true }
                : notification
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
        setUnreadCount(0);
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const getNotificationIcon = (type) => {
        const iconMap = {
            booking: '🚌',
            booking_confirmed: '✅',
            payment: '💳',
            payment_success: '💰',
            service_request: '🔧',
            service_approved: '✅',
            order: '📦',
            order_shipped: '🚚',
            maintenance: '⚠️',
            reminder: '⏰'
        };
        return iconMap[type] || '📢';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#e74c3c';
            case 'medium': return '#f39c12';
            case 'low': return '#2ecc71';
            default: return '#95a5a6';
        }
    };

    return (
        <div style={styles.container} ref={dropdownRef}>
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={styles.notificationButton}
                title="Notifications"
            >
                🔔
                {unreadCount > 0 && (
                    <span style={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>

            {showDropdown && (
                <div style={styles.dropdown}>
                    <div style={styles.header}>
                        <h3 style={styles.title}>Notifications</h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                style={styles.markAllButton}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div style={styles.notificationsList}>
                        {notifications.length === 0 ? (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>🔔</div>
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div 
                                    key={notification.id}
                                    style={{
                                        ...styles.notificationItem,
                                        backgroundColor: notification.read ? '#ffffff' : '#f8f9fa'
                                    }}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
                                >
                                    <div style={styles.notificationIcon}>
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div style={styles.notificationContent}>
                                        <div style={styles.notificationHeader}>
                                            <h4 style={styles.notificationTitle}>{notification.title}</h4>
                                            <span style={styles.notificationTime}>
                                                {getTimeAgo(notification.timestamp)}
                                            </span>
                                        </div>
                                        <p style={styles.notificationMessage}>{notification.message}</p>
                                    </div>
                                    <div style={{
                                        ...styles.priorityIndicator,
                                        backgroundColor: getPriorityColor(notification.priority)
                                    }}></div>
                                    {!notification.read && (
                                        <div style={styles.unreadDot}></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div style={styles.footer}>
                        <button style={styles.viewAllButton}>
                            View All Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        display: 'inline-block'
    },
    notificationButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        position: 'relative',
        padding: '0.5rem',
        borderRadius: '50%',
        transition: 'background-color 0.2s ease'
    },
    badge: {
        position: 'absolute',
        top: '0',
        right: '0',
        backgroundColor: '#e74c3c',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        minWidth: '18px',
        height: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid white'
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: '0',
        width: '400px',
        maxHeight: '500px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        border: '1px solid #e9ecef',
        zIndex: 1000,
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
    },
    title: {
        margin: 0,
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    markAllButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        fontSize: '0.8rem',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    notificationsList: {
        maxHeight: '350px',
        overflowY: 'auto'
    },
    notificationItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #f1f3f5',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        position: 'relative'
    },
    notificationIcon: {
        fontSize: '1.2rem',
        minWidth: '30px',
        textAlign: 'center',
        marginTop: '0.2rem'
    },
    notificationContent: {
        flex: 1,
        minWidth: 0
    },
    notificationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.25rem'
    },
    notificationTitle: {
        margin: 0,
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#2c3e50',
        lineHeight: '1.2'
    },
    notificationTime: {
        fontSize: '0.7rem',
        color: '#7f8c8d',
        whiteSpace: 'nowrap',
        marginLeft: '0.5rem'
    },
    notificationMessage: {
        margin: 0,
        fontSize: '0.8rem',
        color: '#5a6c7d',
        lineHeight: '1.3',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
    },
    priorityIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '3px'
    },
    unreadDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#007bff',
        borderRadius: '50%',
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    },
    footer: {
        padding: '1rem 1.5rem',
        borderTop: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
    },
    viewAllButton: {
        width: '100%',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    emptyState: {
        textAlign: 'center',
        padding: '2rem',
        color: '#7f8c8d'
    },
    emptyIcon: {
        fontSize: '2rem',
        marginBottom: '0.5rem'
    }
};

export default NotificationCenter;
