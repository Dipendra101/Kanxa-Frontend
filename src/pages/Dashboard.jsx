// client/src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserDashboard from './UserDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        // Fallback for safety, should be protected by a route wrapper
        return <Navigate to="/login" replace />;
    }

    if (isAdmin) {
        // If the user is an admin, redirect to the admin dashboard
        return <Navigate to="/admin/dashboard" replace />;
    } else {
        // For regular users, show the comprehensive dashboard
        return <UserDashboard />;
    }
};

export default Dashboard;
