// client/src/pages/MyOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api/constructionApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        const fetchOrders = async () => {
            try {
                const { data } = await getMyOrders(token);
                setOrders(data.data.orders);
            } catch (error) {
                toast.error("Failed to fetch orders.");
            }
            setLoading(false);
        };
        fetchOrders();
    }, [token]);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Delivered': return { color: '#2ecc71', text: 'Delivered' };
            case 'Shipped': return { color: '#3498db', text: 'Shipped' };
            case 'Processing': return { color: '#f39c12', text: 'Processing' };
            case 'Pending': return { color: '#95a5a6', text: 'Pending' };
            case 'Cancelled': return { color: '#e74c3c', text: 'Cancelled' };
            default: return { color: '#7f8c8d', text: 'Unknown' };
        }
    };

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading your orders...</p>;

    if (!token) {
        return (
            <div className="account-page-container">
                 <div className="empty-state">
                    <div className="empty-state-icon">🔒</div>
                    <h2>Please Login</h2>
                    <p>You need to be logged in to see your orders.</p>
                    <Link to="/login" className="empty-state-link">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="account-page-container">
            <Toaster position="top-center" />
            <h1 className="account-page-title">My Orders</h1>
            {orders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h2>No Orders Found</h2>
                    <p>You haven't placed any orders yet. Let's find some supplies!</p>
                    <Link to="/construction" className="empty-state-link">Browse Products</Link>
                </div>
            ) : (
                <div className="account-grid">
                    {orders.map(order => {
                        const statusInfo = getStatusInfo(order.orderStatus);
                        return (
                            <div key={order._id} className="account-card">
                                <div className="account-card-header">
                                    <div>
                                        <h3 className="account-card-title">Order #{order._id.substring(0, 8)}...</h3>
                                        <p style={{color: '#777', margin: '0.25rem 0 0'}}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="account-card-icon">📦</div>
                                </div>
                                <div className="account-card-body">
                                    <p><strong>Items:</strong> {order.orderItems.length} different product(s)</p>
                                    <p><strong>Deliver To:</strong> {order.shippingAddress.address}</p>
                                    <p><strong>Total Price:</strong> NPR {order.totalPrice}</p>
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

export default MyOrdersPage;