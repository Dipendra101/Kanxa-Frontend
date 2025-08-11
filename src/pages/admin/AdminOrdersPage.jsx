// client/src/pages/admin/AdminOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await getAllOrders();
            setOrders(data.data.orders);
        } catch (error) {
            toast.error("Failed to fetch orders.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const toastId = toast.loading("Updating status...");
        try {
            await updateOrderStatus(orderId, newStatus);
            toast.success("Order status updated!", { id: toastId });
            fetchOrders(); // Refresh the list to show the change
        } catch (error) {
            toast.error("Failed to update order status.", { id: toastId });
        }
    };

    const getStatusChip = (status) => {
        const baseStyle = 'px-3 py-1 text-xs font-medium text-white rounded-full';
        switch (status) {
            case 'Delivered': return `${baseStyle} bg-green-500`;
            case 'Shipped': return `${baseStyle} bg-blue-500`;
            case 'Processing': return `${baseStyle} bg-yellow-500`;
            case 'Pending': return `${baseStyle} bg-gray-500`;
            case 'Cancelled': return `${baseStyle} bg-red-500`;
            default: return `${baseStyle} bg-gray-400`;
        }
    };

    if (loading) return <div className="text-center p-8">Loading orders...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <Toaster position="top-center" />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage All Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length > 0 ? orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-500">#{order._id.substring(0, 8)}...</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{order.user?.name || 'N/A'}</div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold">NPR {order.totalPrice}</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <span className={getStatusChip(order.orderStatus)}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm">
                                    <select 
                                        defaultValue={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrdersPage;