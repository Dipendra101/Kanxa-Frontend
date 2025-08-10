// client/src/pages/Dashboard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        // For regular users, redirect to their main account page
        return <Navigate to="/my-bookings" replace />;
    }
};

export default Dashboard;