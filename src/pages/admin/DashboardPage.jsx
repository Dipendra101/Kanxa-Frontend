// client/src/pages/admin/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/adminApi';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getDashboardStats();
                setStats(data.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) return <p>Loading Dashboard...</p>;
    if (!stats) return <p>Could not load dashboard data.</p>;
    
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div style={styles.statsGrid}>
                <StatCard title="Total Revenue" value={`NPR ${stats.revenue.total.toFixed(2)}`} icon="💰" />
                <StatCard title="Total Users" value={stats.counts.users} icon="👥" />
                <StatCard title="Total Bookings" value={stats.counts.bookings} icon="🚌" />
                <StatCard title="Total Orders" value={stats.counts.orders} icon="📦" />
            </div>
            {/* We will add recent activity lists here later */}
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div style={styles.card}>
        <div style={styles.icon}>{icon}</div>
        <div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardValue}>{value}</p>
        </div>
    </div>
);

const styles = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    },
    icon: { fontSize: '2.5rem' },
    cardTitle: { margin: 0, color: '#666' },
    cardValue: { margin: '0.25rem 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }
};

export default DashboardPage;