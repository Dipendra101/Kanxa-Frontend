// client/src/pages/MyRequestsPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyServiceRequests } from '../api/garageApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const MyRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        const fetchRequests = async () => {
            try {
                const { data } = await getMyServiceRequests();
                setRequests(data.data.requests);
            } catch (error) {
                toast.error("Failed to fetch your service requests.");
            }
            setLoading(false);
        };
        fetchRequests();
    }, [token]);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Completed': return { color: '#1abc9c', text: 'Completed' };
            case 'Approved': return { color: '#2ecc71', text: 'Approved' };
            case 'In Review': return { color: '#3498db', text: 'In Review' };
            case 'Pending': return { color: '#f39c12', text: 'Pending' };
            case 'Rejected': return { color: '#e74c3c', text: 'Rejected' };
            default: return { color: '#95a5a6', text: 'Unknown' };
        }
    };

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading Your Requests...</p>;

    if (!token) {
        return (
            <div className="account-page-container">
                 <div className="empty-state">
                    <div className="empty-state-icon">🔒</div>
                    <h2>Please Login</h2>
                    <p>You need to be logged in to see your service requests.</p>
                    <Link to="/login" className="empty-state-link">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="account-page-container">
            <Toaster position="top-center" />
            <h1 className="account-page-title">My Service Requests</h1>
            {requests.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔧</div>
                    <h2>No Service Requests</h2>
                    <p>You haven't requested any workshop services yet.</p>
                    <Link to="/garage" className="empty-state-link">Request a Service</Link>
                </div>
            ) : (
                <div className="account-grid">
                    {requests.map(req => {
                        const statusInfo = getStatusInfo(req.status);
                        return (
                            <div key={req._id} className="account-card">
                                <div className="account-card-header">
                                    <div>
                                        <h3 className="account-card-title">{req.vehicleType} Service</h3>
                                        <p style={{color: '#777', margin: '0.25rem 0 0'}}>Requested on {new Date(req.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="account-card-icon">🔧</div>
                                </div>
                                <div className="account-card-body">
                                    <p><strong>Service Needed:</strong> {req.serviceDescription}</p>
                                    {req.adminNotes && (
                                        <p style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', borderLeft: `4px solid ${statusInfo.color}`}}>
                                            <strong>Admin Note:</strong> {req.adminNotes}
                                        </p>
                                    )}
                                </div>
                                <div className="account-card-footer">
                                    <span className="status-pill" style={{ backgroundColor: statusInfo.color }}>
                                        {statusInfo.text}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;