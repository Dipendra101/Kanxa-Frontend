import React, { useState, useEffect } from 'react';
import { getAllAdminBookings } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const BookingManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await getAllAdminBookings();
            // Mock data if API is not ready
            const mockBookings = [
                {
                    _id: '1',
                    bookingId: 'BK001',
                    user: { name: 'John Doe', email: 'john@example.com', phone: '+977-9876543210' },
                    vehicle: { name: 'Deluxe Bus KTM-01', registrationNumber: 'BA 12 PA 3456', type: 'Bus' },
                    route: { from: 'Kathmandu', to: 'Pokhara' },
                    travelDate: '2024-02-15',
                    bookingDate: '2024-02-10T10:30:00Z',
                    bookedSeats: [{ seatNumber: 'A1' }, { seatNumber: 'A2' }],
                    totalPrice: 2400,
                    paymentStatus: 'Completed',
                    bookingStatus: 'Confirmed',
                    passengerCount: 2,
                    specialRequests: 'Window seats preferred'
                },
                {
                    _id: '2',
                    bookingId: 'BK002',
                    user: { name: 'Jane Smith', email: 'jane@example.com', phone: '+977-9876543211' },
                    vehicle: { name: 'Tourist Van PKR-03', registrationNumber: 'GA 9 PA 2345', type: 'Van' },
                    route: { from: 'Pokhara', to: 'Chitwan' },
                    travelDate: '2024-02-16',
                    bookingDate: '2024-02-11T14:15:00Z',
                    bookedSeats: [{ seatNumber: 'B1' }],
                    totalPrice: 1800,
                    paymentStatus: 'Pending',
                    bookingStatus: 'Pending',
                    passengerCount: 1,
                    specialRequests: null
                },
                {
                    _id: '3',
                    bookingId: 'BK003',
                    user: { name: 'Ram Bahadur', email: 'ram@example.com', phone: '+977-9876543212' },
                    vehicle: { name: 'Cargo Truck LMG-02', registrationNumber: 'BA 15 KHA 7890', type: 'Truck' },
                    route: { from: 'Lamjung', to: 'Kathmandu' },
                    travelDate: '2024-02-17',
                    bookingDate: '2024-02-12T09:45:00Z',
                    bookedSeats: [{ seatNumber: 'C1' }],
                    totalPrice: 1500,
                    paymentStatus: 'Completed',
                    bookingStatus: 'Confirmed',
                    passengerCount: 1,
                    specialRequests: 'Early morning departure'
                }
            ];
            setBookings(data?.bookings || mockBookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            toast.error('Failed to load bookings');
        }
        setLoading(false);
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || booking.bookingStatus.toLowerCase() === filterStatus.toLowerCase();
        const matchesDate = !filterDate || booking.travelDate === filterDate;
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return '#2ecc71';
            case 'pending': return '#f39c12';
            case 'cancelled': return '#e74c3c';
            case 'completed': return '#3498db';
            default: return '#95a5a6';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return '#2ecc71';
            case 'pending': return '#f39c12';
            case 'failed': return '#e74c3c';
            case 'refunded': return '#9b59b6';
            default: return '#95a5a6';
        }
    };

    const updateBookingStatus = (bookingId, newStatus) => {
        setBookings(bookings.map(booking => 
            booking._id === bookingId 
                ? { ...booking, bookingStatus: newStatus }
                : booking
        ));
        toast.success(`Booking status updated to ${newStatus}`);
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowDetailsModal(true);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading bookings...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Booking Management</h1>
                    <p style={styles.subtitle}>Monitor and manage all transportation bookings</p>
                </div>
                <div style={styles.headerStats}>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{bookings.length}</div>
                        <div style={styles.statLabel}>Total Bookings</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{bookings.filter(b => b.bookingStatus === 'Pending').length}</div>
                        <div style={styles.statLabel}>Pending</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by customer name, booking ID, or vehicle..."
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
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
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
                        <div style={styles.summaryValue}>NPR {bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}</div>
                        <div style={styles.summaryLabel}>Total Revenue</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>🎫</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{bookings.reduce((sum, b) => sum + b.passengerCount, 0)}</div>
                        <div style={styles.summaryLabel}>Total Passengers</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>✅</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{bookings.filter(b => b.paymentStatus === 'Completed').length}</div>
                        <div style={styles.summaryLabel}>Paid Bookings</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>⏰</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{bookings.filter(b => b.bookingStatus === 'Pending').length}</div>
                        <div style={styles.summaryLabel}>Needs Action</div>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div style={styles.tableContainer}>
                <div style={styles.tableHeader}>
                    <h2 style={styles.tableTitle}>Recent Bookings</h2>
                    <button style={styles.exportButton}>Export CSV</button>
                </div>
                
                <div style={styles.table}>
                    <div style={styles.tableHeaderRow}>
                        <div style={styles.tableHeaderCell}>Booking ID</div>
                        <div style={styles.tableHeaderCell}>Customer</div>
                        <div style={styles.tableHeaderCell}>Route</div>
                        <div style={styles.tableHeaderCell}>Travel Date</div>
                        <div style={styles.tableHeaderCell}>Vehicle</div>
                        <div style={styles.tableHeaderCell}>Amount</div>
                        <div style={styles.tableHeaderCell}>Payment</div>
                        <div style={styles.tableHeaderCell}>Status</div>
                        <div style={styles.tableHeaderCell}>Actions</div>
                    </div>
                    
                    {filteredBookings.map((booking) => (
                        <div key={booking._id} style={styles.tableRow}>
                            <div style={styles.tableCell}>
                                <div style={styles.bookingId}>{booking.bookingId}</div>
                                <div style={styles.bookingDate}>
                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.customerName}>{booking.user.name}</div>
                                <div style={styles.customerContact}>{booking.user.phone}</div>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.routeText}>{booking.route.from} → {booking.route.to}</div>
                                <div style={styles.seatsText}>{booking.bookedSeats.length} seat(s)</div>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.travelDate}>
                                    {new Date(booking.travelDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.vehicleName}>{booking.vehicle.name}</div>
                                <div style={styles.vehicleReg}>{booking.vehicle.registrationNumber}</div>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.amount}>NPR {booking.totalPrice.toLocaleString()}</div>
                            </div>
                            <div style={styles.tableCell}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getPaymentStatusColor(booking.paymentStatus)
                                }}>
                                    {booking.paymentStatus}
                                </span>
                            </div>
                            <div style={styles.tableCell}>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusColor(booking.bookingStatus)
                                }}>
                                    {booking.bookingStatus}
                                </span>
                            </div>
                            <div style={styles.tableCell}>
                                <div style={styles.actionButtons}>
                                    <button 
                                        onClick={() => handleViewDetails(booking)}
                                        style={styles.actionButton}
                                    >
                                        View
                                    </button>
                                    {booking.bookingStatus === 'Pending' && (
                                        <>
                                            <button 
                                                onClick={() => updateBookingStatus(booking._id, 'Confirmed')}
                                                style={{...styles.actionButton, backgroundColor: '#2ecc71'}}
                                            >
                                                Confirm
                                            </button>
                                            <button 
                                                onClick={() => updateBookingStatus(booking._id, 'Cancelled')}
                                                style={{...styles.actionButton, backgroundColor: '#e74c3c'}}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBookings.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>📊</div>
                        <h3>No bookings found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Booking Details Modal */}
            {showDetailsModal && selectedBooking && (
                <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Booking Details</h2>
                            <button 
                                onClick={() => setShowDetailsModal(false)}
                                style={styles.closeButton}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div style={styles.modalContent}>
                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Customer Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Name:</span>
                                        <span style={styles.detailValue}>{selectedBooking.user.name}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Email:</span>
                                        <span style={styles.detailValue}>{selectedBooking.user.email}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Phone:</span>
                                        <span style={styles.detailValue}>{selectedBooking.user.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Booking Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Booking ID:</span>
                                        <span style={styles.detailValue}>{selectedBooking.bookingId}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Route:</span>
                                        <span style={styles.detailValue}>{selectedBooking.route.from} → {selectedBooking.route.to}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Travel Date:</span>
                                        <span style={styles.detailValue}>{new Date(selectedBooking.travelDate).toLocaleDateString()}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Seats:</span>
                                        <span style={styles.detailValue}>
                                            {selectedBooking.bookedSeats.map(s => s.seatNumber).join(', ')}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Total Price:</span>
                                        <span style={styles.detailValue}>NPR {selectedBooking.totalPrice.toLocaleString()}</span>
                                    </div>
                                    {selectedBooking.specialRequests && (
                                        <div style={styles.detailItem}>
                                            <span style={styles.detailLabel}>Special Requests:</span>
                                            <span style={styles.detailValue}>{selectedBooking.specialRequests}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Vehicle Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Vehicle:</span>
                                        <span style={styles.detailValue}>{selectedBooking.vehicle.name}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Registration:</span>
                                        <span style={styles.detailValue}>{selectedBooking.vehicle.registrationNumber}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Type:</span>
                                        <span style={styles.detailValue}>{selectedBooking.vehicle.type}</span>
                                    </div>
                                </div>
                            </div>
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
    headerStats: {
        display: 'flex',
        gap: '2rem'
    },
    statItem: {
        textAlign: 'center'
    },
    statValue: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    statLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
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
        backgroundColor: 'white'
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
    tableContainer: {
        backgroundColor: 'white',
        margin: '0 2rem 2rem',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid #e9ecef'
    },
    tableTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: 0
    },
    exportButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer'
    },
    table: {
        display: 'flex',
        flexDirection: 'column'
    },
    tableHeaderRow: {
        display: 'grid',
        gridTemplateColumns: '120px 150px 150px 100px 150px 100px 100px 100px 200px',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: '#2c3e50'
    },
    tableHeaderCell: {
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '120px 150px 150px 100px 150px 100px 100px 100px 200px',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '1px solid #f1f3f5',
        transition: 'background-color 0.2s ease'
    },
    tableCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bookingId: {
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    bookingDate: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    customerName: {
        fontWeight: '600',
        color: '#2c3e50'
    },
    customerContact: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    routeText: {
        fontWeight: '500',
        color: '#2c3e50'
    },
    seatsText: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    travelDate: {
        fontWeight: '500',
        color: '#2c3e50'
    },
    vehicleName: {
        fontWeight: '500',
        color: '#2c3e50'
    },
    vehicleReg: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    amount: {
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase',
        alignSelf: 'flex-start'
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    actionButton: {
        padding: '0.25rem 0.5rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: '500',
        cursor: 'pointer',
        backgroundColor: '#007bff',
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
        maxWidth: '800px',
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
    detailSection: {
        marginBottom: '2rem'
    },
    detailSectionTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '1rem',
        borderBottom: '2px solid #3498db',
        paddingBottom: '0.5rem'
    },
    detailGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
    },
    detailItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    detailLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    detailValue: {
        fontSize: '1rem',
        color: '#2c3e50',
        fontWeight: '500'
    }
};

export default BookingManagementPage;
