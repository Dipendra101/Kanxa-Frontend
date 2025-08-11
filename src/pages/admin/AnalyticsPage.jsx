import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const AnalyticsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedMetric, setSelectedMetric] = useState('revenue');
    const [loading, setLoading] = useState(false);

    // Mock analytics data - in real app, this would come from API
    const analyticsData = {
        revenue: {
            total: 2840000,
            growth: 15.3,
            breakdown: {
                transportation: 1420000,
                construction: 950000,
                garage: 470000
            },
            monthly: [
                { period: 'Jan', value: 450000, transportation: 220000, construction: 150000, garage: 80000 },
                { period: 'Feb', value: 520000, transportation: 260000, construction: 180000, garage: 80000 },
                { period: 'Mar', value: 680000, transportation: 340000, construction: 240000, garage: 100000 },
                { period: 'Apr', value: 750000, transportation: 380000, construction: 250000, garage: 120000 },
                { period: 'May', value: 440000, transportation: 220000, construction: 130000, garage: 90000 }
            ]
        },
        users: {
            total: 8547,
            growth: 12.7,
            breakdown: {
                active: 6820,
                new: 1247,
                returning: 480
            },
            demographics: [
                { category: 'Age 18-25', count: 2563, percentage: 30 },
                { category: 'Age 26-35', count: 3419, percentage: 40 },
                { category: 'Age 36-45', count: 1709, percentage: 20 },
                { category: 'Age 46+', count: 856, percentage: 10 }
            ]
        },
        bookings: {
            total: 3247,
            growth: 8.9,
            breakdown: {
                completed: 2847,
                pending: 234,
                cancelled: 166
            },
            routes: [
                { route: 'Kathmandu - Pokhara', count: 847, revenue: 1016400 },
                { route: 'Lamjung - Kathmandu', count: 623, revenue: 747600 },
                { route: 'Pokhara - Chitwan', count: 456, revenue: 547200 },
                { route: 'Kathmandu - Chitwan', count: 389, revenue: 466800 },
                { route: 'Custom Tours', count: 932, revenue: 1863200 }
            ]
        },
        performance: {
            avgResponseTime: 145,
            uptime: 99.9,
            errorRate: 0.02,
            customerSatisfaction: 4.7
        }
    };

    const quickStats = [
        { 
            title: 'Total Revenue', 
            value: `NPR ${analyticsData.revenue.total.toLocaleString()}`, 
            growth: analyticsData.revenue.growth,
            icon: '💰',
            color: '#2ecc71'
        },
        { 
            title: 'Active Users', 
            value: analyticsData.users.total.toLocaleString(), 
            growth: analyticsData.users.growth,
            icon: '👥',
            color: '#3498db'
        },
        { 
            title: 'Total Bookings', 
            value: analyticsData.bookings.total.toLocaleString(), 
            growth: analyticsData.bookings.growth,
            icon: '🎫',
            color: '#e67e22'
        },
        { 
            title: 'Customer Rating', 
            value: `${analyticsData.performance.customerSatisfaction}/5.0`, 
            growth: 2.3,
            icon: '⭐',
            color: '#9b59b6'
        }
    ];

    const topRoutes = analyticsData.bookings.routes.sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    const revenueByMonth = analyticsData.revenue.monthly;

    const getGrowthColor = (growth) => {
        return growth >= 0 ? '#2ecc71' : '#e74c3c';
    };

    const formatCurrency = (amount) => {
        return `NPR ${amount.toLocaleString()}`;
    };

    const getMaxValue = (data) => {
        return Math.max(...data.map(item => item.value));
    };

    const BarChart = ({ data, height = 200 }) => {
        const maxValue = getMaxValue(data);
        
        return (
            <div style={styles.chartContainer}>
                <div style={styles.barChart}>
                    {data.map((item, index) => (
                        <div key={index} style={styles.barWrapper}>
                            <div style={styles.barColumn}>
                                <div 
                                    style={{
                                        ...styles.bar,
                                        height: `${(item.value / maxValue) * height}px`,
                                        background: `linear-gradient(45deg, #3498db, #2980b9)`
                                    }}
                                    title={`${item.period}: ${formatCurrency(item.value)}`}
                                >
                                    <span style={styles.barValue}>
                                        {formatCurrency(item.value / 1000)}K
                                    </span>
                                </div>
                            </div>
                            <div style={styles.barLabel}>{item.period}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const PieChart = ({ data, title }) => {
        const total = Object.values(data).reduce((sum, value) => sum + value, 0);
        const colors = ['#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f39c12'];
        
        let cumulativePercentage = 0;
        
        return (
            <div style={styles.pieChartContainer}>
                <h4 style={styles.chartTitle}>{title}</h4>
                <div style={styles.pieChart}>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        {Object.entries(data).map(([key, value], index) => {
                            const percentage = (value / total) * 100;
                            const angle = (percentage / 100) * 360;
                            const startAngle = (cumulativePercentage / 100) * 360 - 90;
                            
                            const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                            const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                            const x2 = 100 + 80 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                            const y2 = 100 + 80 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                            
                            const largeArcFlag = angle > 180 ? 1 : 0;
                            
                            const pathData = [
                                `M 100 100`,
                                `L ${x1} ${y1}`,
                                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                'Z'
                            ].join(' ');
                            
                            cumulativePercentage += percentage;
                            
                            return (
                                <path
                                    key={key}
                                    d={pathData}
                                    fill={colors[index % colors.length]}
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                            );
                        })}
                    </svg>
                </div>
                <div style={styles.pieLegend}>
                    {Object.entries(data).map(([key, value], index) => (
                        <div key={key} style={styles.legendItem}>
                            <div 
                                style={{
                                    ...styles.legendColor, 
                                    backgroundColor: colors[index % colors.length]
                                }}
                            ></div>
                            <span style={styles.legendText}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Analytics Dashboard</h1>
                    <p style={styles.subtitle}>Comprehensive insights into your business performance</p>
                </div>
                <div style={styles.headerControls}>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        style={styles.select}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button 
                        onClick={() => toast.success('Analytics data exported!')}
                        style={styles.exportButton}
                    >
                        Export Report
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div style={styles.statsGrid}>
                {quickStats.map((stat, index) => (
                    <div key={index} style={{...styles.statCard, borderLeft: `4px solid ${stat.color}`}}>
                        <div style={styles.statHeader}>
                            <div style={styles.statIcon}>{stat.icon}</div>
                            <div style={{
                                ...styles.statGrowth,
                                color: getGrowthColor(stat.growth)
                            }}>
                                {stat.growth >= 0 ? '+' : ''}{stat.growth}%
                            </div>
                        </div>
                        <div style={styles.statValue}>{stat.value}</div>
                        <div style={styles.statLabel}>{stat.title}</div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div style={styles.chartSection}>
                <div style={styles.chartHeader}>
                    <h2 style={styles.sectionTitle}>Revenue Trends</h2>
                    <div style={styles.chartControls}>
                        <button 
                            style={{
                                ...styles.chartButton,
                                backgroundColor: selectedMetric === 'revenue' ? '#007bff' : '#f8f9fa',
                                color: selectedMetric === 'revenue' ? 'white' : '#6c757d'
                            }}
                            onClick={() => setSelectedMetric('revenue')}
                        >
                            Revenue
                        </button>
                        <button 
                            style={{
                                ...styles.chartButton,
                                backgroundColor: selectedMetric === 'bookings' ? '#007bff' : '#f8f9fa',
                                color: selectedMetric === 'bookings' ? 'white' : '#6c757d'
                            }}
                            onClick={() => setSelectedMetric('bookings')}
                        >
                            Bookings
                        </button>
                    </div>
                </div>
                <BarChart data={revenueByMonth} />
            </div>

            <div style={styles.contentGrid}>
                {/* Revenue Breakdown */}
                <div style={styles.section}>
                    <PieChart 
                        data={analyticsData.revenue.breakdown} 
                        title="Revenue by Sector" 
                    />
                </div>

                {/* Top Routes */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Top Performing Routes</h3>
                    <div style={styles.routesList}>
                        {topRoutes.map((route, index) => (
                            <div key={index} style={styles.routeItem}>
                                <div style={styles.routeRank}>#{index + 1}</div>
                                <div style={styles.routeInfo}>
                                    <div style={styles.routeName}>{route.route}</div>
                                    <div style={styles.routeStats}>
                                        <span>{route.count} bookings</span>
                                        <span>{formatCurrency(route.revenue)}</span>
                                    </div>
                                </div>
                                <div style={styles.routeBar}>
                                    <div 
                                        style={{
                                            ...styles.routeProgress,
                                            width: `${(route.revenue / topRoutes[0].revenue) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Demographics */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>User Demographics</h3>
                    <div style={styles.demographicsList}>
                        {analyticsData.users.demographics.map((demo, index) => (
                            <div key={index} style={styles.demographicItem}>
                                <div style={styles.demographicInfo}>
                                    <span style={styles.demographicCategory}>{demo.category}</span>
                                    <span style={styles.demographicCount}>{demo.count.toLocaleString()}</span>
                                </div>
                                <div style={styles.demographicBar}>
                                    <div 
                                        style={{
                                            ...styles.demographicProgress,
                                            width: `${demo.percentage}%`
                                        }}
                                    ></div>
                                </div>
                                <span style={styles.demographicPercentage}>{demo.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Metrics */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>System Performance</h3>
                    <div style={styles.performanceGrid}>
                        <div style={styles.performanceItem}>
                            <div style={styles.performanceIcon}>⚡</div>
                            <div style={styles.performanceValue}>{analyticsData.performance.avgResponseTime}ms</div>
                            <div style={styles.performanceLabel}>Avg Response Time</div>
                        </div>
                        <div style={styles.performanceItem}>
                            <div style={styles.performanceIcon}>🚀</div>
                            <div style={styles.performanceValue}>{analyticsData.performance.uptime}%</div>
                            <div style={styles.performanceLabel}>Uptime</div>
                        </div>
                        <div style={styles.performanceItem}>
                            <div style={styles.performanceIcon}>🛡️</div>
                            <div style={styles.performanceValue}>{analyticsData.performance.errorRate}%</div>
                            <div style={styles.performanceLabel}>Error Rate</div>
                        </div>
                        <div style={styles.performanceItem}>
                            <div style={styles.performanceIcon}>😊</div>
                            <div style={styles.performanceValue}>{analyticsData.performance.customerSatisfaction}/5</div>
                            <div style={styles.performanceLabel}>Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Summary */}
            <div style={styles.activitySection}>
                <h2 style={styles.sectionTitle}>Key Insights</h2>
                <div style={styles.insightsGrid}>
                    <div style={styles.insightCard}>
                        <div style={styles.insightIcon}>📈</div>
                        <div style={styles.insightContent}>
                            <h4>Revenue Growth</h4>
                            <p>Your revenue has grown by 15.3% this month, with transportation leading the growth.</p>
                        </div>
                    </div>
                    <div style={styles.insightCard}>
                        <div style={styles.insightIcon}>🎯</div>
                        <div style={styles.insightContent}>
                            <h4>Popular Route</h4>
                            <p>Kathmandu-Pokhara remains your most profitable route with 847 bookings this month.</p>
                        </div>
                    </div>
                    <div style={styles.insightCard}>
                        <div style={styles.insightIcon}>👥</div>
                        <div style={styles.insightContent}>
                            <h4>User Acquisition</h4>
                            <p>You've gained 1,247 new users this month, a 12.7% increase from last month.</p>
                        </div>
                    </div>
                    <div style={styles.insightCard}>
                        <div style={styles.insightIcon}>⭐</div>
                        <div style={styles.insightContent}>
                            <h4>Customer Satisfaction</h4>
                            <p>Your customer rating of 4.7/5 shows excellent service quality across all sectors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '0',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '2rem',
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
        margin: 0
    },
    headerControls: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    select: {
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: 'white'
    },
    exportButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: 'white'
    },
    statCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '1.5rem'
    },
    statHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    statIcon: {
        fontSize: '2rem'
    },
    statGrowth: {
        fontSize: '0.9rem',
        fontWeight: 'bold'
    },
    statValue: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    statLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    },
    chartSection: {
        backgroundColor: 'white',
        padding: '2rem',
        borderBottom: '1px solid #e9ecef'
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: 0
    },
    chartControls: {
        display: 'flex',
        gap: '0.5rem'
    },
    chartButton: {
        padding: '0.5rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    chartContainer: {
        padding: '1rem 0'
    },
    barChart: {
        display: 'flex',
        alignItems: 'end',
        gap: '2rem',
        height: '250px',
        padding: '1rem 0'
    },
    barWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    barColumn: {
        display: 'flex',
        alignItems: 'end',
        height: '200px',
        width: '100%',
        justifyContent: 'center'
    },
    bar: {
        width: '40px',
        borderRadius: '4px 4px 0 0',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        padding: '0.25rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    barValue: {
        marginBottom: '0.25rem'
    },
    barLabel: {
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        color: '#7f8c8d',
        textAlign: 'center'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        padding: '2rem'
    },
    section: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    pieChartContainer: {
        textAlign: 'center'
    },
    chartTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '1rem'
    },
    pieChart: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
    },
    pieLegend: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem'
    },
    legendColor: {
        width: '12px',
        height: '12px',
        borderRadius: '2px'
    },
    legendText: {
        color: '#2c3e50'
    },
    routesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    routeItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    routeRank: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#3498db',
        minWidth: '30px'
    },
    routeInfo: {
        flex: 1
    },
    routeName: {
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.25rem'
    },
    routeStats: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    routeBar: {
        width: '100px',
        height: '6px',
        backgroundColor: '#e9ecef',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    routeProgress: {
        height: '100%',
        backgroundColor: '#3498db',
        borderRadius: '3px'
    },
    demographicsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    demographicItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    demographicInfo: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between'
    },
    demographicCategory: {
        fontWeight: '500',
        color: '#2c3e50'
    },
    demographicCount: {
        color: '#7f8c8d',
        fontSize: '0.9rem'
    },
    demographicBar: {
        width: '100px',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    demographicProgress: {
        height: '100%',
        backgroundColor: '#2ecc71',
        borderRadius: '4px'
    },
    demographicPercentage: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        minWidth: '35px',
        textAlign: 'right'
    },
    performanceGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem'
    },
    performanceItem: {
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    performanceIcon: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem'
    },
    performanceValue: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.25rem'
    },
    performanceLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    activitySection: {
        backgroundColor: 'white',
        padding: '2rem'
    },
    insightsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    insightCard: {
        display: 'flex',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
    },
    insightIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    insightContent: {
        flex: 1
    }
};

export default AnalyticsPage;
