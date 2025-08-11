import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyBookings } from '../api/transportationApi';
import { getMyOrders } from '../api/constructionApi';
import { getMyServiceRequests } from '../api/garageApi';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/LandingPage.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        orders: [],
        requests: [],
        loading: true
    });
    const [notifications] = useState([
        { id: 1, type: 'booking', message: 'Your booking to Kathmandu is confirmed', time: '2 hours ago', unread: true },
        { id: 2, type: 'order', message: 'Cement order is being processed', time: '1 day ago', unread: true },
        { id: 3, type: 'service', message: 'Tractor service request approved', time: '3 days ago', unread: false }
    ]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [bookingsRes, ordersRes, requestsRes] = await Promise.all([
                    getMyBookings(token).catch(() => ({ data: { data: { bookings: [] } } })),
                    getMyOrders(token).catch(() => ({ data: { data: { orders: [] } } })),
                    getMyServiceRequests().catch(() => ({ data: { data: { requests: [] } } }))
                ]);

                setDashboardData({
                    bookings: bookingsRes.data.data.bookings?.slice(0, 3) || [],
                    orders: ordersRes.data.data.orders?.slice(0, 3) || [],
                    requests: requestsRes.data.data.requests?.slice(0, 3) || [],
                    loading: false
                });
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                setDashboardData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const stats = [
        { 
            title: 'Total Bookings', 
            value: dashboardData.bookings.length, 
            icon: '🚌', 
            color: '#3498db',
            link: '/my-bookings'
        },
        { 
            title: 'Active Orders', 
            value: dashboardData.orders.filter(o => o.orderStatus !== 'Delivered').length, 
            icon: '📦', 
            color: '#e67e22',
            link: '/my-orders'
        },
        { 
            title: 'Service Requests', 
            value: dashboardData.requests.length, 
            icon: '🔧', 
            color: '#2ecc71',
            link: '/my-requests'
        },
        { 
            title: 'Notifications', 
            value: notifications.filter(n => n.unread).length, 
            icon: '🔔', 
            color: '#e74c3c',
            link: '#notifications'
        }
    ];

    const quickActions = [
        { title: 'Book Transportation', description: 'Book bus or cargo service', icon: '🚌', link: '/transportation', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { title: 'Order Supplies', description: 'Construction materials & tools', icon: '🏗️', link: '/construction', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { title: 'Request Service', description: 'Garage & workshop services', icon: '🔧', link: '/garage', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { title: 'View Cart', description: 'Check your shopping cart', icon: '🛒', link: '/cart', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
    ];

    if (dashboardData.loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div style={styles.dashboard}>
            <Toaster position="top-center" />
            
            {/* Header Section */}
            <div style={styles.header}>
                <div style={styles.welcomeSection}>
                    <h1 style={styles.welcomeTitle}>{getGreeting()}, {user?.name || 'User'}!</h1>
                    <p style={styles.welcomeSubtitle}>Welcome back to your Kanxa Safari dashboard</p>
                </div>
                <div style={styles.dateSection}>
                    <div style={styles.dateCard}>
                        <div style={styles.dateNumber}>{new Date().getDate()}</div>
                        <div style={styles.dateMonth}>{new Date().toLocaleDateString('en', { month: 'short' })}</div>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <Link key={index} to={stat.link} style={styles.statCard}>
                        <div style={styles.statIcon}>{stat.icon}</div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>{stat.value}</div>
                            <div style={styles.statTitle}>{stat.title}</div>
                        </div>
                        <div style={{...styles.statIndicator, backgroundColor: stat.color}}></div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Quick Actions</h2>
                <div style={styles.quickActionsGrid}>
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.link} style={{...styles.quickActionCard, background: action.gradient}}>
                            <div style={styles.quickActionIcon}>{action.icon}</div>
                            <div style={styles.quickActionContent}>
                                <h3 style={styles.quickActionTitle}>{action.title}</h3>
                                <p style={styles.quickActionDescription}>{action.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={styles.contentGrid}>
                {/* Recent Bookings */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Recent Bookings</h2>
                        <Link to="/my-bookings" style={styles.viewAllLink}>View All</Link>
                    </div>
                    <div style={styles.cardContainer}>
                        {dashboardData.bookings.length > 0 ? (
                            dashboardData.bookings.map((booking, index) => (
                                <div key={index} style={styles.itemCard}>
                                    <div style={styles.itemIcon}>🚌</div>
                                    <div style={styles.itemContent}>
                                        <h4 style={styles.itemTitle}>{booking.route?.from} → {booking.route?.to}</h4>
                                        <p style={styles.itemSubtitle}>
                                            {new Date(booking.travelDate).toLocaleDateString()} • 
                                            {booking.bookedSeats?.length} seat(s)
                                        </p>
                                        <div style={styles.itemMeta}>
                                            <span style={styles.itemPrice}>NPR {booking.totalPrice}</span>
                                            <span style={{
                                                ...styles.itemStatus,
                                                backgroundColor: booking.paymentStatus === 'Completed' ? '#2ecc71' : '#f39c12'
                                            }}>
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>🚌</div>
                                <p>No bookings yet. <Link to="/transportation" style={styles.emptyLink}>Book your first ride!</Link></p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Recent Orders</h2>
                        <Link to="/my-orders" style={styles.viewAllLink}>View All</Link>
                    </div>
                    <div style={styles.cardContainer}>
                        {dashboardData.orders.length > 0 ? (
                            dashboardData.orders.map((order, index) => (
                                <div key={index} style={styles.itemCard}>
                                    <div style={styles.itemIcon}>📦</div>
                                    <div style={styles.itemContent}>
                                        <h4 style={styles.itemTitle}>Order #{order._id?.substring(0, 8)}...</h4>
                                        <p style={styles.itemSubtitle}>
                                            {order.orderItems?.length} items • 
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <div style={styles.itemMeta}>
                                            <span style={styles.itemPrice}>NPR {order.totalPrice}</span>
                                            <span style={{
                                                ...styles.itemStatus,
                                                backgroundColor: order.orderStatus === 'Delivered' ? '#2ecc71' : 
                                                               order.orderStatus === 'Shipped' ? '#3498db' : '#f39c12'
                                            }}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>📦</div>
                                <p>No orders yet. <Link to="/construction" style={styles.emptyLink}>Browse our products!</Link></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Service Requests & Notifications */}
            <div style={styles.contentGrid}>
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Service Requests</h2>
                        <Link to="/my-requests" style={styles.viewAllLink}>View All</Link>
                    </div>
                    <div style={styles.cardContainer}>
                        {dashboardData.requests.length > 0 ? (
                            dashboardData.requests.map((request, index) => (
                                <div key={index} style={styles.itemCard}>
                                    <div style={styles.itemIcon}>🔧</div>
                                    <div style={styles.itemContent}>
                                        <h4 style={styles.itemTitle}>{request.vehicleType} Service</h4>
                                        <p style={styles.itemSubtitle}>
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                        <span style={{
                                            ...styles.itemStatus,
                                            backgroundColor: request.status === 'Completed' ? '#2ecc71' : 
                                                           request.status === 'Approved' ? '#3498db' : '#f39c12'
                                        }}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>🔧</div>
                                <p>No service requests. <Link to="/garage" style={styles.emptyLink}>Request a service!</Link></p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Recent Notifications</h2>
                    <div style={styles.notificationContainer}>
                        {notifications.map((notification) => (
                            <div key={notification.id} style={{
                                ...styles.notificationCard,
                                backgroundColor: notification.unread ? '#f8f9fa' : '#ffffff'
                            }}>
                                <div style={styles.notificationIcon}>
                                    {notification.type === 'booking' ? '🚌' : 
                                     notification.type === 'order' ? '📦' : '🔧'}
                                </div>
                                <div style={styles.notificationContent}>
                                    <p style={styles.notificationMessage}>{notification.message}</p>
                                    <span style={styles.notificationTime}>{notification.time}</span>
                                </div>
                                {notification.unread && <div style={styles.unreadDot}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        gap: '1rem'
    },
    loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        color: 'white'
    },
    welcomeSection: {
        flex: 1
    },
    welcomeTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0'
    },
    welcomeSubtitle: {
        fontSize: '1.1rem',
        opacity: 0.9,
        margin: 0
    },
    dateSection: {
        display: 'flex',
        alignItems: 'center'
    },
    dateCard: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '15px',
        padding: '1rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
    },
    dateNumber: {
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    dateMonth: {
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    },
    statIcon: {
        fontSize: '2.5rem',
        minWidth: '60px',
        textAlign: 'center'
    },
    statContent: {
        flex: 1
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    statTitle: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    statIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '4px',
        height: '100%'
    },
    section: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: 0
    },
    viewAllLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
    },
    quickActionCard: {
        borderRadius: '15px',
        padding: '1.5rem',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    quickActionIcon: {
        fontSize: '2.5rem',
        minWidth: '60px',
        textAlign: 'center'
    },
    quickActionContent: {
        flex: 1
    },
    quickActionTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0'
    },
    quickActionDescription: {
        fontSize: '0.9rem',
        opacity: 0.9,
        margin: 0
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    itemCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #e9ecef',
        borderRadius: '10px',
        transition: 'all 0.3s ease'
    },
    itemIcon: {
        fontSize: '1.5rem',
        minWidth: '40px',
        textAlign: 'center'
    },
    itemContent: {
        flex: 1
    },
    itemTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        margin: '0 0 0.25rem 0',
        color: '#2c3e50'
    },
    itemSubtitle: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
        margin: '0 0 0.5rem 0'
    },
    itemMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPrice: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    itemStatus: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '500'
    },
    emptyState: {
        textAlign: 'center',
        padding: '2rem',
        color: '#7f8c8d'
    },
    emptyIcon: {
        fontSize: '3rem',
        marginBottom: '1rem'
    },
    emptyLink: {
        color: '#007bff',
        textDecoration: 'none'
    },
    notificationContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    notificationCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '10px',
        border: '1px solid #e9ecef',
        position: 'relative'
    },
    notificationIcon: {
        fontSize: '1.25rem',
        minWidth: '30px',
        textAlign: 'center'
    },
    notificationContent: {
        flex: 1
    },
    notificationMessage: {
        fontSize: '0.9rem',
        margin: '0 0 0.25rem 0',
        color: '#2c3e50'
    },
    notificationTime: {
        fontSize: '0.75rem',
        color: '#7f8c8d'
    },
    unreadDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#e74c3c',
        borderRadius: '50%',
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    }
};

export default UserDashboard;
