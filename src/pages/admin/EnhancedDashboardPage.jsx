import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const EnhancedDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [recentActivity] = useState([
        { id: 1, type: 'booking', message: 'New booking: Kathmandu to Pokhara', time: '5 minutes ago', priority: 'high' },
        { id: 2, type: 'order', message: 'Large cement order placed', time: '12 minutes ago', priority: 'medium' },
        { id: 3, type: 'service', message: 'Tractor service request submitted', time: '25 minutes ago', priority: 'low' },
        { id: 4, type: 'payment', message: 'Payment confirmation received', time: '1 hour ago', priority: 'medium' },
        { id: 5, type: 'user', message: 'New user registration', time: '2 hours ago', priority: 'low' }
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getDashboardStats();
                setStats(data.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
                toast.error("Failed to load dashboard data");
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const quickActions = [
        { title: 'Manage Vehicles', description: 'Add, edit, or remove vehicles', icon: '🚌', link: '/admin/vehicles', color: '#3498db' },
        { title: 'View Bookings', description: 'Monitor all transportation bookings', icon: '📊', link: '/admin/bookings', color: '#e67e22' },
        { title: 'Product Inventory', description: 'Manage construction supplies', icon: '📦', link: '/admin/products', color: '#2ecc71' },
        { title: 'Service Requests', description: 'Handle garage service requests', icon: '🔧', link: '/admin/requests', color: '#9b59b6' },
        { title: 'Order Management', description: 'Process customer orders', icon: '🛍️', link: '/admin/orders', color: '#f39c12' },
        { title: 'User Management', description: 'Manage user accounts', icon: '👥', link: '/admin/users', color: '#1abc9c' }
    ];

    const revenueData = [
        { period: 'January', transportation: 450000, construction: 320000, garage: 180000 },
        { period: 'February', transportation: 520000, construction: 380000, garage: 220000 },
        { period: 'March', transportation: 480000, construction: 420000, garage: 190000 },
        { period: 'April', transportation: 650000, construction: 510000, garage: 250000 }
    ];

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (!stats) {
        return (
            <div style={styles.errorContainer}>
                <h2>Unable to load dashboard</h2>
                <p>Please try refreshing the page</p>
            </div>
        );
    }

    const totalRevenue = stats.revenue?.total || 0;
    const monthlyGrowth = 12.5; // This would come from backend
    const activeUsers = stats.counts?.users || 0;
    const pendingRequests = 8; // This would come from backend

    return (
        <div style={styles.dashboard}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>Monitor and manage your Kanxa Safari operations</p>
                </div>
                <div style={styles.headerActions}>
                    <select 
                        value={selectedPeriod} 
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        style={styles.periodSelector}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                    <div style={styles.metricHeader}>
                        <div style={styles.metricIcon}>💰</div>
                        <div style={styles.metricGrowth}>+{monthlyGrowth}%</div>
                    </div>
                    <div style={styles.metricValue}>NPR {totalRevenue.toLocaleString()}</div>
                    <div style={styles.metricLabel}>Total Revenue</div>
                    <div style={styles.metricChart}>
                        <div style={{...styles.metricBar, width: '85%', backgroundColor: '#2ecc71'}}></div>
                    </div>
                </div>

                <div style={styles.metricCard}>
                    <div style={styles.metricHeader}>
                        <div style={styles.metricIcon}>👥</div>
                        <div style={styles.metricGrowth}>+8.2%</div>
                    </div>
                    <div style={styles.metricValue}>{activeUsers.toLocaleString()}</div>
                    <div style={styles.metricLabel}>Active Users</div>
                    <div style={styles.metricChart}>
                        <div style={{...styles.metricBar, width: '72%', backgroundColor: '#3498db'}}></div>
                    </div>
                </div>

                <div style={styles.metricCard}>
                    <div style={styles.metricHeader}>
                        <div style={styles.metricIcon}>📊</div>
                        <div style={styles.metricGrowth}>+15.3%</div>
                    </div>
                    <div style={styles.metricValue}>{stats.counts?.bookings || 0}</div>
                    <div style={styles.metricLabel}>Total Bookings</div>
                    <div style={styles.metricChart}>
                        <div style={{...styles.metricBar, width: '68%', backgroundColor: '#e67e22'}}></div>
                    </div>
                </div>

                <div style={styles.metricCard}>
                    <div style={styles.metricHeader}>
                        <div style={styles.metricIcon}>⚠️</div>
                        <div style={styles.metricGrowth}>-5.1%</div>
                    </div>
                    <div style={styles.metricValue}>{pendingRequests}</div>
                    <div style={styles.metricLabel}>Pending Requests</div>
                    <div style={styles.metricChart}>
                        <div style={{...styles.metricBar, width: '25%', backgroundColor: '#e74c3c'}}></div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Quick Actions</h2>
                <div style={styles.quickActionsGrid}>
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.link} style={styles.quickActionCard}>
                            <div style={{...styles.quickActionIcon, backgroundColor: action.color}}>
                                {action.icon}
                            </div>
                            <div style={styles.quickActionContent}>
                                <h3 style={styles.quickActionTitle}>{action.title}</h3>
                                <p style={styles.quickActionDescription}>{action.description}</p>
                            </div>
                            <div style={styles.quickActionArrow}>→</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={styles.contentGrid}>
                {/* Revenue Chart */}
                <div style={styles.chartSection}>
                    <div style={styles.chartHeader}>
                        <h2 style={styles.sectionTitle}>Revenue by Sector</h2>
                        <div style={styles.chartLegend}>
                            <div style={styles.legendItem}>
                                <div style={{...styles.legendColor, backgroundColor: '#3498db'}}></div>
                                <span>Transportation</span>
                            </div>
                            <div style={styles.legendItem}>
                                <div style={{...styles.legendColor, backgroundColor: '#2ecc71'}}></div>
                                <span>Construction</span>
                            </div>
                            <div style={styles.legendItem}>
                                <div style={{...styles.legendColor, backgroundColor: '#e67e22'}}></div>
                                <span>Garage</span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.chartContainer}>
                        {revenueData.map((data, index) => (
                            <div key={index} style={styles.chartBar}>
                                <div style={styles.chartPeriod}>{data.period}</div>
                                <div style={styles.barContainer}>
                                    <div 
                                        style={{
                                            ...styles.barSegment, 
                                            backgroundColor: '#3498db',
                                            height: `${(data.transportation / 10000)}px`
                                        }}
                                        title={`Transportation: NPR ${data.transportation.toLocaleString()}`}
                                    ></div>
                                    <div 
                                        style={{
                                            ...styles.barSegment, 
                                            backgroundColor: '#2ecc71',
                                            height: `${(data.construction / 10000)}px`
                                        }}
                                        title={`Construction: NPR ${data.construction.toLocaleString()}`}
                                    ></div>
                                    <div 
                                        style={{
                                            ...styles.barSegment, 
                                            backgroundColor: '#e67e22',
                                            height: `${(data.garage / 10000)}px`
                                        }}
                                        title={`Garage: NPR ${data.garage.toLocaleString()}`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.activitySection}>
                    <h2 style={styles.sectionTitle}>Recent Activity</h2>
                    <div style={styles.activityContainer}>
                        {recentActivity.map((activity) => (
                            <div key={activity.id} style={styles.activityItem}>
                                <div style={{
                                    ...styles.activityIcon,
                                    backgroundColor: activity.type === 'booking' ? '#3498db' :
                                                   activity.type === 'order' ? '#2ecc71' :
                                                   activity.type === 'service' ? '#e67e22' :
                                                   activity.type === 'payment' ? '#9b59b6' : '#1abc9c'
                                }}>
                                    {activity.type === 'booking' ? '🚌' :
                                     activity.type === 'order' ? '📦' :
                                     activity.type === 'service' ? '🔧' :
                                     activity.type === 'payment' ? '💳' : '👤'}
                                </div>
                                <div style={styles.activityContent}>
                                    <p style={styles.activityMessage}>{activity.message}</p>
                                    <span style={styles.activityTime}>{activity.time}</span>
                                </div>
                                <div style={{
                                    ...styles.activityPriority,
                                    backgroundColor: activity.priority === 'high' ? '#e74c3c' :
                                                   activity.priority === 'medium' ? '#f39c12' : '#95a5a6'
                                }}></div>
                            </div>
                        ))}
                    </div>
                    <Link to="/admin/activity" style={styles.viewAllActivity}>View All Activity</Link>
                </div>
            </div>

            {/* System Status */}
            <div style={styles.statusSection}>
                <h2 style={styles.sectionTitle}>System Status</h2>
                <div style={styles.statusGrid}>
                    <div style={styles.statusCard}>
                        <div style={styles.statusHeader}>
                            <span style={styles.statusLabel}>Database</span>
                            <div style={{...styles.statusIndicator, backgroundColor: '#2ecc71'}}></div>
                        </div>
                        <div style={styles.statusValue}>99.9% Uptime</div>
                    </div>
                    <div style={styles.statusCard}>
                        <div style={styles.statusHeader}>
                            <span style={styles.statusLabel}>API Response</span>
                            <div style={{...styles.statusIndicator, backgroundColor: '#2ecc71'}}></div>
                        </div>
                        <div style={styles.statusValue}>145ms Avg</div>
                    </div>
                    <div style={styles.statusCard}>
                        <div style={styles.statusHeader}>
                            <span style={styles.statusLabel}>Payment Gateway</span>
                            <div style={{...styles.statusIndicator, backgroundColor: '#f39c12'}}></div>
                        </div>
                        <div style={styles.statusValue}>Processing</div>
                    </div>
                    <div style={styles.statusCard}>
                        <div style={styles.statusHeader}>
                            <span style={styles.statusLabel}>Storage</span>
                            <div style={{...styles.statusIndicator, backgroundColor: '#2ecc71'}}></div>
                        </div>
                        <div style={styles.statusValue}>73% Used</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        padding: '0',
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
    errorContainer: {
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: 'white',
        borderRadius: '15px',
        margin: '2rem'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '2rem 2rem 1rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '0 0 0.5rem 0'
    },
    subtitle: {
        color: '#7f8c8d',
        margin: 0,
        fontSize: '1rem'
    },
    headerActions: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    periodSelector: {
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
        fontSize: '0.9rem'
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: 'white'
    },
    metricCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        padding: '1.5rem',
        border: '1px solid #e9ecef'
    },
    metricHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    metricIcon: {
        fontSize: '1.5rem',
        padding: '0.5rem',
        backgroundColor: 'white',
        borderRadius: '10px'
    },
    metricGrowth: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        padding: '0.25rem 0.5rem',
        borderRadius: '12px'
    },
    metricValue: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    metricLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginBottom: '1rem'
    },
    metricChart: {
        height: '6px',
        backgroundColor: '#e9ecef',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    metricBar: {
        height: '100%',
        borderRadius: '3px',
        transition: 'width 0.3s ease'
    },
    section: {
        backgroundColor: 'white',
        padding: '2rem',
        borderBottom: '1px solid #e9ecef'
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '1.5rem'
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1rem'
    },
    quickActionCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        border: '1px solid #e9ecef'
    },
    quickActionIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: 'white'
    },
    quickActionContent: {
        flex: 1
    },
    quickActionTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        margin: '0 0 0.25rem 0',
        color: '#2c3e50'
    },
    quickActionDescription: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
        margin: 0
    },
    quickActionArrow: {
        fontSize: '1.2rem',
        color: '#bdc3c7'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: 'white'
    },
    chartSection: {
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        padding: '1.5rem',
        border: '1px solid #e9ecef'
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    chartLegend: {
        display: 'flex',
        gap: '1rem'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.8rem'
    },
    legendColor: {
        width: '12px',
        height: '12px',
        borderRadius: '2px'
    },
    chartContainer: {
        display: 'flex',
        alignItems: 'end',
        gap: '2rem',
        height: '200px',
        padding: '1rem 0'
    },
    chartBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    chartPeriod: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        marginBottom: '0.5rem'
    },
    barContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1px',
        height: '150px',
        justifyContent: 'end'
    },
    barSegment: {
        width: '30px',
        borderRadius: '2px 2px 0 0',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    activitySection: {
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        padding: '1.5rem',
        border: '1px solid #e9ecef'
    },
    activityContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1rem'
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        position: 'relative'
    },
    activityIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1rem'
    },
    activityContent: {
        flex: 1
    },
    activityMessage: {
        fontSize: '0.9rem',
        margin: '0 0 0.25rem 0',
        color: '#2c3e50'
    },
    activityTime: {
        fontSize: '0.75rem',
        color: '#7f8c8d'
    },
    activityPriority: {
        width: '4px',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: '0 10px 10px 0'
    },
    viewAllActivity: {
        display: 'block',
        textAlign: 'center',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    statusSection: {
        backgroundColor: 'white',
        padding: '2rem'
    },
    statusGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
    },
    statusCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        padding: '1rem',
        border: '1px solid #e9ecef'
    },
    statusHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
    },
    statusLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    statusIndicator: {
        width: '8px',
        height: '8px',
        borderRadius: '50%'
    },
    statusValue: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#2c3e50'
    }
};

export default EnhancedDashboardPage;
