// client/src/pages/MyOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api/constructionApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast.error("Please log in to view your orders.");
            setLoading(false);
            return;
        }
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

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading your orders...</p>;

    return (
        <div style={styles.page}>
            <Toaster />
            <h1>My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders. <Link to="/construction">Start Shopping</Link></p>
            ) : (
                <div style={styles.table}>
                    <div style={styles.header}>
                        <div style={{flex: 1}}>ORDER ID</div>
                        <div style={{flex: 1}}>DATE</div>
                        <div style={{flex: 1}}>TOTAL</div>
                        <div style={{flex: 1}}>STATUS</div>
                    </div>
                    {orders.map(order => (
                        <div key={order._id} style={styles.row}>
                            <div style={{flex: 1}}>{order._id}</div>
                            <div style={{flex: 1}}>{new Date(order.createdAt).toLocaleDateString()}</div>
                            <div style={{flex: 1}}>NPR {order.totalPrice}</div>
                            <div style={{flex: 1}}>{order.orderStatus}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { maxWidth: '1200px', margin: '2rem auto', padding: '2rem' },
    table: { display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', fontWeight: 'bold', padding: '1rem', borderBottom: '2px solid #333' },
    row: { display: 'flex', padding: '1rem', borderBottom: '1px solid #eee' },
};

export default MyOrdersPage;