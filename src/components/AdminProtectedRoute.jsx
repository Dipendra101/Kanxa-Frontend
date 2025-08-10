// client/src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return { token, role: decoded.role || 'user' }; // Assuming role is in the token
    }
    return { token: null, role: 'user' };
};

const AdminProtectedRoute = () => {
    const { token, role } = useAuth();

    if (!token) {
        // Not logged in, redirect to login
        return <Navigate to="/login" />;
    }

    if (role !== 'admin') {
        // Logged in but not an admin, redirect to homepage or an 'unauthorized' page
        return <Navigate to="/" />;
    }
    
    // Logged in and is an admin, allow access to the nested routes
    return <Outlet />;
};

export default AdminProtectedRoute;