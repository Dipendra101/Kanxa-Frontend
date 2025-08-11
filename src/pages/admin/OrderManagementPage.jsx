import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await getAllOrders();
            // Mock data if API is not ready
            const mockOrders = [
                {
                    _id: '1',
                    orderId: 'ORD-001',
                    user: { name: 'John Doe', email: 'john@example.com', phone: '+977-9876543210' },
                    orderItems: [
                        { product: { name: 'Premium Cement OPC 53', price: 850, image: 'cement1.jpg' }, quantity: 10, price: 8500 },
                        { product: { name: 'Steel Rebar TMT 12mm', price: 95, image: 'rebar1.jpg' }, quantity: 50, price: 4750 }
                    ],
                    totalPrice: 13250,
                    orderStatus: 'Processing',
                    paymentStatus: 'Completed',
                    paymentMethod: 'Khalti',
                    shippingAddress: {
                        address: 'Kathmandu, Balaju',
                        phone: '+977-9876543210'
                    },
                    estimatedDelivery: '2024-02-20',
                    createdAt: '2024-02-15T10:30:00Z',
                    trackingNumber: 'TRK001234'
                },
                {
                    _id: '2',
                    orderId: 'ORD-002',
                    user: { name: 'Jane Smith', email: 'jane@example.com', phone: '+977-9876543211' },
                    orderItems: [
                        { product: { name: 'Red Clay Bricks', price: 15, image: 'brick1.jpg' }, quantity: 1000, price: 15000 },
                        { product: { name: 'PVC Water Pipes 4 inch', price: 450, image: 'pipe1.jpg' }, quantity: 20, price: 9000 }
                    ],
                    totalPrice: 24000,
                    orderStatus: 'Shipped',
                    paymentStatus: 'Completed',
                    paymentMethod: 'eSewa',
                    shippingAddress: {
                        address: 'Pokhara, Lakeside',
                        phone: '+977-9876543211'
                    },
                    estimatedDelivery: '2024-02-18',
                    createdAt: '2024-02-12T14:15:00Z',
                    trackingNumber: 'TRK001235'
                },
                {
                    _id: '3',
                    orderId: 'ORD-003',
                    user: { name: 'Ram Bahadur', email: 'ram@example.com', phone: '+977-9876543212' },
                    orderItems: [
                        { product: { name: 'JCB Rental (Daily)', price: 5000, image: 'jcb1.jpg' }, quantity: 3, price: 15000 }
                    ],
                    totalPrice: 15000,
                    orderStatus: 'Delivered',
                    paymentStatus: 'Completed',
                    paymentMethod: 'Bank Transfer',
                    shippingAddress: {
                        address: 'Lamjung, Besisahar',
                        phone: '+977-9876543212'
                    },
                    estimatedDelivery: '2024-02-16',
                    createdAt: '2024-02-10T09:45:00Z',
                    trackingNumber: 'TRK001236'
                }
            ];
            setOrders(data?.orders || mockOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        }
        setLoading(false);
    };

    const statusOptions = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
        const matchesDate = !filterDate || order.createdAt.startsWith(filterDate);
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#f39c12';
            case 'Processing': return '#3498db';
            case 'Shipped': return '#9b59b6';
            case 'Delivered': return '#2ecc71';
            case 'Cancelled': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#2ecc71';
            case 'Pending': return '#f39c12';
            case 'Failed': return '#e74c3c';
            case 'Refunded': return '#9b59b6';
            default: return '#95a5a6';
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order => 
                order._id === orderId 
                    ? { ...order, orderStatus: newStatus }
                    : order
            ));
            toast.success(`Order status updated to ${newStatus}`);
            setShowDetailsModal(false);
        } catch (error) {
            toast.error('Failed to update order status');
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    const calculateSummary = () => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrders = orders.length;
        const completedOrders = orders.filter(order => order.orderStatus === 'Delivered').length;
        const pendingOrders = orders.filter(order => order.orderStatus === 'Pending' || order.orderStatus === 'Processing').length;
        
        return { totalRevenue, totalOrders, completedOrders, pendingOrders };
    };

    const summary = calculateSummary();

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Order Management</h1>
                    <p style={styles.subtitle}>Manage and track all customer orders</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.exportButton} onClick={() => toast.success('Orders exported!')}>
                        Export Orders
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by customer name, order ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                <div style={styles.filterGroup}>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={styles.filterSelect}
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>
                                {status === 'all' ? 'All Status' : status}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        style={styles.filterSelect}
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>💰</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>NPR {summary.totalRevenue.toLocaleString()}</div>
                        <div style={styles.summaryLabel}>Total Revenue</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>📦</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{summary.totalOrders}</div>
                        <div style={styles.summaryLabel}>Total Orders</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>✅</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{summary.completedOrders}</div>
                        <div style={styles.summaryLabel}>Completed Orders</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>⏰</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{summary.pendingOrders}</div>
                        <div style={styles.summaryLabel}>Pending Orders</div>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div style={styles.ordersContainer}>
                <div style={styles.ordersHeader}>
                    <h2 style={styles.sectionTitle}>Orders ({filteredOrders.length})</h2>
                </div>
                
                <div style={styles.ordersList}>
                    {filteredOrders.map((order) => (
                        <div key={order._id} style={styles.orderCard}>
                            <div style={styles.orderHeader}>
                                <div style={styles.orderInfo}>
                                    <div style={styles.orderId}>#{order.orderId}</div>
                                    <div style={styles.orderDate}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={styles.orderBadges}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(order.orderStatus)
                                    }}>
                                        {order.orderStatus}
                                    </span>
                                    <span style={{
                                        ...styles.paymentBadge,
                                        backgroundColor: getPaymentStatusColor(order.paymentStatus)
                                    }}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div style={styles.customerSection}>
                                <div style={styles.customerAvatar}>
                                    {order.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div style={styles.customerDetails}>
                                    <div style={styles.customerName}>{order.user.name}</div>
                                    <div style={styles.customerContact}>{order.user.email}</div>
                                    <div style={styles.customerContact}>{order.user.phone}</div>
                                </div>
                            </div>

                            <div style={styles.orderItems}>
                                <div style={styles.itemsHeader}>
                                    <span>Items ({order.orderItems.length})</span>
                                </div>
                                <div style={styles.itemsList}>
                                    {order.orderItems.slice(0, 2).map((item, index) => (
                                        <div key={index} style={styles.orderItem}>
                                            <div style={styles.itemIcon}>📦</div>
                                            <div style={styles.itemDetails}>
                                                <div style={styles.itemName}>{item.product.name}</div>
                                                <div style={styles.itemQuantity}>Qty: {item.quantity}</div>
                                            </div>
                                            <div style={styles.itemPrice}>NPR {item.price.toLocaleString()}</div>
                                        </div>
                                    ))}
                                    {order.orderItems.length > 2 && (
                                        <div style={styles.moreItems}>
                                            +{order.orderItems.length - 2} more items
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.orderFooter}>
                                <div style={styles.shippingInfo}>
                                    <div style={styles.shippingAddress}>
                                        📍 {order.shippingAddress.address}
                                    </div>
                                    <div style={styles.deliveryInfo}>
                                        🚚 Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={styles.orderTotal}>
                                    <div style={styles.totalLabel}>Total</div>
                                    <div style={styles.totalAmount}>NPR {order.totalPrice.toLocaleString()}</div>
                                </div>
                            </div>

                            <div style={styles.orderActions}>
                                <button 
                                    onClick={() => handleViewDetails(order)}
                                    style={styles.viewButton}
                                >
                                    View Details
                                </button>
                                {order.orderStatus === 'Pending' && (
                                    <button 
                                        onClick={() => updateStatus(order._id, 'Processing')}
                                        style={{...styles.actionButton, backgroundColor: '#3498db'}}
                                    >
                                        Process
                                    </button>
                                )}
                                {order.orderStatus === 'Processing' && (
                                    <button 
                                        onClick={() => updateStatus(order._id, 'Shipped')}
                                        style={{...styles.actionButton, backgroundColor: '#9b59b6'}}
                                    >
                                        Ship
                                    </button>
                                )}
                                {order.orderStatus === 'Shipped' && (
                                    <button 
                                        onClick={() => updateStatus(order._id, 'Delivered')}
                                        style={{...styles.actionButton, backgroundColor: '#2ecc71'}}
                                    >
                                        Deliver
                                    </button>
                                )}
                                <button 
                                    onClick={() => toast.success('Tracking link sent to customer')}
                                    style={{...styles.actionButton, backgroundColor: '#17a2b8'}}
                                >
                                    Track
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>📦</div>
                        <h3>No orders found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Order Details - #{selectedOrder.orderId}</h2>
                            <button 
                                onClick={() => setShowDetailsModal(false)}
                                style={styles.closeButton}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div style={styles.modalContent}>
                            <div style={styles.modalGrid}>
                                <div style={styles.modalSection}>
                                    <h3 style={styles.modalSectionTitle}>Order Information</h3>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Order ID:</span>
                                        <span style={styles.detailValue}>{selectedOrder.orderId}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Order Date:</span>
                                        <span style={styles.detailValue}>
                                            {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Status:</span>
                                        <span style={{
                                            ...styles.detailValue,
                                            color: getStatusColor(selectedOrder.orderStatus),
                                            fontWeight: 'bold'
                                        }}>
                                            {selectedOrder.orderStatus}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Payment Status:</span>
                                        <span style={{
                                            ...styles.detailValue,
                                            color: getPaymentStatusColor(selectedOrder.paymentStatus),
                                            fontWeight: 'bold'
                                        }}>
                                            {selectedOrder.paymentStatus}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Payment Method:</span>
                                        <span style={styles.detailValue}>{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Tracking Number:</span>
                                        <span style={styles.detailValue}>{selectedOrder.trackingNumber}</span>
                                    </div>
                                </div>

                                <div style={styles.modalSection}>
                                    <h3 style={styles.modalSectionTitle}>Customer Information</h3>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Name:</span>
                                        <span style={styles.detailValue}>{selectedOrder.user.name}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Email:</span>
                                        <span style={styles.detailValue}>{selectedOrder.user.email}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Phone:</span>
                                        <span style={styles.detailValue}>{selectedOrder.user.phone}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Shipping Address:</span>
                                        <span style={styles.detailValue}>{selectedOrder.shippingAddress.address}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Estimated Delivery:</span>
                                        <span style={styles.detailValue}>
                                            {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.orderItemsSection}>
                                <h3 style={styles.modalSectionTitle}>Order Items</h3>
                                <div style={styles.itemsTable}>
                                    {selectedOrder.orderItems.map((item, index) => (
                                        <div key={index} style={styles.tableRow}>
                                            <div style={styles.itemImagePlaceholder}>📦</div>
                                            <div style={styles.itemInfo}>
                                                <div style={styles.itemName}>{item.product.name}</div>
                                                <div style={styles.itemPrice}>NPR {item.product.price.toLocaleString()} each</div>
                                            </div>
                                            <div style={styles.itemQuantity}>×{item.quantity}</div>
                                            <div style={styles.itemTotal}>NPR {item.price.toLocaleString()}</div>
                                        </div>
                                    ))}
                                    <div style={styles.orderTotalRow}>
                                        <div style={styles.totalText}>Total Amount:</div>
                                        <div style={styles.totalValue}>NPR {selectedOrder.totalPrice.toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={styles.modalActions}>
                            {selectedOrder.orderStatus === 'Pending' && (
                                <button 
                                    onClick={() => updateStatus(selectedOrder._id, 'Processing')}
                                    style={{...styles.modalButton, backgroundColor: '#3498db'}}
                                >
                                    Mark as Processing
                                </button>
                            )}
                            {selectedOrder.orderStatus === 'Processing' && (
                                <button 
                                    onClick={() => updateStatus(selectedOrder._id, 'Shipped')}
                                    style={{...styles.modalButton, backgroundColor: '#9b59b6'}}
                                >
                                    Mark as Shipped
                                </button>
                            )}
                            {selectedOrder.orderStatus === 'Shipped' && (
                                <button 
                                    onClick={() => updateStatus(selectedOrder._id, 'Delivered')}
                                    style={{...styles.modalButton, backgroundColor: '#2ecc71'}}
                                >
                                    Mark as Delivered
                                </button>
                            )}
                            <button 
                                onClick={() => toast.success('Invoice sent to customer')}
                                style={{...styles.modalButton, backgroundColor: '#17a2b8'}}
                            >
                                Send Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
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
    headerActions: {
        display: 'flex',
        gap: '1rem'
    },
    exportButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    filtersContainer: {
        display: 'flex',
        gap: '1rem',
        padding: '1.5rem 2rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef'
    },
    searchContainer: {
        flex: 1
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
        fontSize: '1rem'
    },
    filterGroup: {
        display: 'flex',
        gap: '1rem'
    },
    filterSelect: {
        padding: '0.75rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
        fontSize: '1rem',
        backgroundColor: 'white',
        minWidth: '150px'
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'white'
    },
    summaryCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #e9ecef'
    },
    summaryIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    summaryContent: {
        flex: 1
    },
    summaryValue: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    summaryLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    },
    ordersContainer: {
        padding: '2rem'
    },
    ordersHeader: {
        marginBottom: '1rem'
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    ordersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #f1f3f5'
    },
    orderInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    orderId: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    orderDate: {
        fontSize: '0.9rem',
        color: '#7f8c8d'
    },
    orderBadges: {
        display: 'flex',
        gap: '0.5rem'
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    paymentBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    customerSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
    },
    customerAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    customerDetails: {
        flex: 1
    },
    customerName: {
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.25rem'
    },
    customerContact: {
        fontSize: '0.85rem',
        color: '#7f8c8d'
    },
    orderItems: {
        marginBottom: '1rem'
    },
    itemsHeader: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    itemsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    orderItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    itemIcon: {
        fontSize: '1.2rem'
    },
    itemDetails: {
        flex: 1
    },
    itemName: {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#2c3e50'
    },
    itemQuantity: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    itemPrice: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    moreItems: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '0.5rem'
    },
    orderFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #f1f3f5'
    },
    shippingInfo: {
        flex: 1
    },
    shippingAddress: {
        fontSize: '0.85rem',
        color: '#7f8c8d',
        marginBottom: '0.25rem'
    },
    deliveryInfo: {
        fontSize: '0.85rem',
        color: '#7f8c8d'
    },
    orderTotal: {
        textAlign: 'right'
    },
    totalLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    },
    totalAmount: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    orderActions: {
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
    },
    viewButton: {
        padding: '0.5rem 1rem',
        border: '1px solid #007bff',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#007bff',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    actionButton: {
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        color: 'white'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        color: '#7f8c8d'
    },
    emptyIcon: {
        fontSize: '4rem',
        marginBottom: '1rem'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '15px',
        maxWidth: '900px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid #e9ecef'
    },
    closeButton: {
        border: 'none',
        background: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '0.25rem'
    },
    modalContent: {
        padding: '1.5rem'
    },
    modalGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
    },
    modalSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    modalSectionTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '2px solid #007bff',
        paddingBottom: '0.5rem'
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid #f8f9fa'
    },
    detailLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        fontWeight: '500'
    },
    detailValue: {
        fontSize: '0.9rem',
        color: '#2c3e50',
        fontWeight: '600'
    },
    orderItemsSection: {
        borderTop: '1px solid #e9ecef',
        paddingTop: '1.5rem'
    },
    itemsTable: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '50px 1fr 80px 120px',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    itemImagePlaceholder: {
        fontSize: '1.5rem',
        textAlign: 'center'
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    orderTotalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#e8f4f8',
        borderRadius: '8px',
        marginTop: '1rem'
    },
    totalText: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    totalValue: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#007bff'
    },
    modalActions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        padding: '1.5rem',
        borderTop: '1px solid #e9ecef'
    },
    modalButton: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer'
    }
};

export default OrderManagementPage;
