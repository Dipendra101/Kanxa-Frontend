import React, { useState, useEffect } from 'react';
import { getAllServiceRequests, updateServiceRequestStatus } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const ServiceRequestManagementPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await getAllServiceRequests();
            // Mock data if API is not ready
            const mockRequests = [
                {
                    _id: '1',
                    requestId: 'SR001',
                    user: { name: 'Ram Bahadur', email: 'ram@example.com', phone: '+977-9876543210' },
                    vehicleType: 'Tractor',
                    vehicleModel: 'Mahindra 275',
                    vehicleYear: '2018',
                    serviceType: 'Maintenance',
                    serviceDescription: 'Regular maintenance check-up, oil change, and hydraulic system inspection needed.',
                    priority: 'Medium',
                    status: 'Pending',
                    preferredDate: '2024-02-20',
                    location: 'Lamjung, Besisahar',
                    estimatedCost: null,
                    adminNotes: null,
                    createdAt: '2024-02-15T10:30:00Z',
                    images: ['tractor1.jpg', 'tractor2.jpg']
                },
                {
                    _id: '2',
                    requestId: 'SR002',
                    user: { name: 'Sita Sharma', email: 'sita@example.com', phone: '+977-9876543211' },
                    vehicleType: 'JCB',
                    vehicleModel: 'JCB 3DX',
                    vehicleYear: '2020',
                    serviceType: 'Repair',
                    serviceDescription: 'Hydraulic arm not working properly. Making strange noises during operation.',
                    priority: 'High',
                    status: 'In Review',
                    preferredDate: '2024-02-18',
                    location: 'Kathmandu, Balaju',
                    estimatedCost: 15000,
                    adminNotes: 'Initial diagnosis completed. Parts ordered.',
                    createdAt: '2024-02-14T14:15:00Z',
                    images: ['jcb1.jpg']
                },
                {
                    _id: '3',
                    requestId: 'SR003',
                    user: { name: 'Krishna Thapa', email: 'krishna@example.com', phone: '+977-9876543212' },
                    vehicleType: 'Mixer',
                    vehicleModel: 'Concrete Mixer 500L',
                    vehicleYear: '2019',
                    serviceType: 'Parts Replacement',
                    serviceDescription: 'Mixing drum motor needs replacement. Also need new mixing blades.',
                    priority: 'Low',
                    status: 'Approved',
                    preferredDate: '2024-02-25',
                    location: 'Pokhara, Lakeside',
                    estimatedCost: 8500,
                    adminNotes: 'Parts available. Scheduled for next week.',
                    createdAt: '2024-02-13T09:20:00Z',
                    images: []
                }
            ];
            setRequests(data?.requests || mockRequests);
        } catch (error) {
            console.error('Failed to fetch service requests:', error);
            toast.error('Failed to load service requests');
        }
        setLoading(false);
    };

    const serviceTypes = ['all', 'Maintenance', 'Repair', 'Parts Replacement', 'Inspection'];
    const statusOptions = ['all', 'Pending', 'In Review', 'Approved', 'Rejected', 'Completed'];
    const vehicleTypes = ['all', 'Tractor', 'JCB', 'Mixer', 'Excavator', 'Loader'];

    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
        const matchesType = filterType === 'all' || request.vehicleType === filterType;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#f39c12';
            case 'In Review': return '#3498db';
            case 'Approved': return '#2ecc71';
            case 'Rejected': return '#e74c3c';
            case 'Completed': return '#27ae60';
            default: return '#95a5a6';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#e74c3c';
            case 'Medium': return '#f39c12';
            case 'Low': return '#2ecc71';
            default: return '#95a5a6';
        }
    };

    const updateRequestStatus = async (requestId, newStatus, notes = '') => {
        try {
            await updateServiceRequestStatus(requestId, newStatus, notes);
            setRequests(requests.map(request => 
                request._id === requestId 
                    ? { ...request, status: newStatus, adminNotes: notes }
                    : request
            ));
            toast.success(`Request status updated to ${newStatus}`);
            setShowDetailsModal(false);
        } catch (error) {
            toast.error('Failed to update request status');
        }
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading service requests...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Service Request Management</h1>
                    <p style={styles.subtitle}>Manage garage and workshop service requests</p>
                </div>
                <div style={styles.headerStats}>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{requests.length}</div>
                        <div style={styles.statLabel}>Total Requests</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{requests.filter(r => r.status === 'Pending').length}</div>
                        <div style={styles.statLabel}>Pending</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by customer name, request ID, or vehicle..."
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
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={styles.filterSelect}
                    >
                        {vehicleTypes.map(type => (
                            <option key={type} value={type}>
                                {type === 'all' ? 'All Vehicles' : type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>🔧</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{requests.length}</div>
                        <div style={styles.summaryLabel}>Total Requests</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>⏰</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{requests.filter(r => r.status === 'Pending').length}</div>
                        <div style={styles.summaryLabel}>Pending Review</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>✅</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{requests.filter(r => r.status === 'Approved').length}</div>
                        <div style={styles.summaryLabel}>Approved</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>🏁</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{requests.filter(r => r.status === 'Completed').length}</div>
                        <div style={styles.summaryLabel}>Completed</div>
                    </div>
                </div>
            </div>

            {/* Requests Grid */}
            <div style={styles.requestsContainer}>
                <div style={styles.requestsGrid}>
                    {filteredRequests.map((request) => (
                        <div key={request._id} style={styles.requestCard}>
                            <div style={styles.requestHeader}>
                                <div style={styles.requestId}>#{request.requestId}</div>
                                <div style={styles.requestBadges}>
                                    <span style={{
                                        ...styles.priorityBadge,
                                        backgroundColor: getPriorityColor(request.priority)
                                    }}>
                                        {request.priority}
                                    </span>
                                    <span style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(request.status)
                                    }}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>

                            <div style={styles.customerInfo}>
                                <div style={styles.customerAvatar}>
                                    {request.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div style={styles.customerDetails}>
                                    <div style={styles.customerName}>{request.user.name}</div>
                                    <div style={styles.customerContact}>{request.user.phone}</div>
                                </div>
                            </div>

                            <div style={styles.vehicleInfo}>
                                <div style={styles.vehicleIcon}>
                                    {request.vehicleType === 'Tractor' ? '🚜' :
                                     request.vehicleType === 'JCB' ? '🚛' :
                                     request.vehicleType === 'Mixer' ? '🔄' : '🚧'}
                                </div>
                                <div style={styles.vehicleDetails}>
                                    <div style={styles.vehicleType}>{request.vehicleType}</div>
                                    <div style={styles.vehicleModel}>{request.vehicleModel} ({request.vehicleYear})</div>
                                </div>
                            </div>

                            <div style={styles.serviceInfo}>
                                <div style={styles.serviceType}>{request.serviceType}</div>
                                <div style={styles.serviceDescription}>
                                    {request.serviceDescription.length > 100 
                                        ? `${request.serviceDescription.substring(0, 100)}...` 
                                        : request.serviceDescription}
                                </div>
                            </div>

                            <div style={styles.requestMeta}>
                                <div style={styles.metaItem}>
                                    <span style={styles.metaLabel}>Preferred Date:</span>
                                    <span style={styles.metaValue}>
                                        {new Date(request.preferredDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={styles.metaItem}>
                                    <span style={styles.metaLabel}>Location:</span>
                                    <span style={styles.metaValue}>{request.location}</span>
                                </div>
                                {request.estimatedCost && (
                                    <div style={styles.metaItem}>
                                        <span style={styles.metaLabel}>Estimated Cost:</span>
                                        <span style={styles.metaValue}>NPR {request.estimatedCost.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            <div style={styles.requestActions}>
                                <button 
                                    onClick={() => handleViewDetails(request)}
                                    style={styles.viewButton}
                                >
                                    View Details
                                </button>
                                {request.status === 'Pending' && (
                                    <>
                                        <button 
                                            onClick={() => updateRequestStatus(request._id, 'Approved')}
                                            style={{...styles.actionButton, backgroundColor: '#2ecc71'}}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => updateRequestStatus(request._id, 'Rejected')}
                                            style={{...styles.actionButton, backgroundColor: '#e74c3c'}}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {request.status === 'Approved' && (
                                    <button 
                                        onClick={() => updateRequestStatus(request._id, 'Completed')}
                                        style={{...styles.actionButton, backgroundColor: '#27ae60'}}
                                    >
                                        Mark Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRequests.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>🔧</div>
                        <h3>No service requests found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Request Details Modal */}
            {showDetailsModal && selectedRequest && (
                <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Service Request Details</h2>
                            <button 
                                onClick={() => setShowDetailsModal(false)}
                                style={styles.closeButton}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div style={styles.modalContent}>
                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Request Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Request ID:</span>
                                        <span style={styles.detailValue}>{selectedRequest.requestId}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Service Type:</span>
                                        <span style={styles.detailValue}>{selectedRequest.serviceType}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Priority:</span>
                                        <span style={{
                                            ...styles.detailValue,
                                            color: getPriorityColor(selectedRequest.priority),
                                            fontWeight: 'bold'
                                        }}>
                                            {selectedRequest.priority}
                                        </span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Status:</span>
                                        <span style={{
                                            ...styles.detailValue,
                                            color: getStatusColor(selectedRequest.status),
                                            fontWeight: 'bold'
                                        }}>
                                            {selectedRequest.status}
                                        </span>
                                    </div>
                                </div>
                                <div style={styles.fullWidthDetail}>
                                    <span style={styles.detailLabel}>Description:</span>
                                    <p style={styles.detailDescription}>{selectedRequest.serviceDescription}</p>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Customer Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Name:</span>
                                        <span style={styles.detailValue}>{selectedRequest.user.name}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Email:</span>
                                        <span style={styles.detailValue}>{selectedRequest.user.email}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Phone:</span>
                                        <span style={styles.detailValue}>{selectedRequest.user.phone}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Location:</span>
                                        <span style={styles.detailValue}>{selectedRequest.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Vehicle Information</h3>
                                <div style={styles.detailGrid}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Type:</span>
                                        <span style={styles.detailValue}>{selectedRequest.vehicleType}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Model:</span>
                                        <span style={styles.detailValue}>{selectedRequest.vehicleModel}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Year:</span>
                                        <span style={styles.detailValue}>{selectedRequest.vehicleYear}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.detailLabel}>Preferred Date:</span>
                                        <span style={styles.detailValue}>
                                            {new Date(selectedRequest.preferredDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {selectedRequest.adminNotes && (
                                <div style={styles.detailSection}>
                                    <h3 style={styles.detailSectionTitle}>Admin Notes</h3>
                                    <p style={styles.adminNotes}>{selectedRequest.adminNotes}</p>
                                </div>
                            )}
                        </div>

                        <div style={styles.modalActions}>
                            {selectedRequest.status === 'Pending' && (
                                <>
                                    <button 
                                        onClick={() => updateRequestStatus(selectedRequest._id, 'Approved')}
                                        style={{...styles.modalButton, backgroundColor: '#2ecc71'}}
                                    >
                                        Approve Request
                                    </button>
                                    <button 
                                        onClick={() => updateRequestStatus(selectedRequest._id, 'Rejected')}
                                        style={{...styles.modalButton, backgroundColor: '#e74c3c'}}
                                    >
                                        Reject Request
                                    </button>
                                </>
                            )}
                            {selectedRequest.status === 'Approved' && (
                                <button 
                                    onClick={() => updateRequestStatus(selectedRequest._id, 'Completed')}
                                    style={{...styles.modalButton, backgroundColor: '#27ae60'}}
                                >
                                    Mark as Completed
                                </button>
                            )}
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
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    summaryLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    },
    requestsContainer: {
        padding: '2rem'
    },
    requestsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
    },
    requestCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
    },
    requestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    requestId: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    requestBadges: {
        display: 'flex',
        gap: '0.5rem'
    },
    priorityBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    customerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
    },
    customerAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    customerDetails: {
        flex: 1
    },
    customerName: {
        fontWeight: '600',
        color: '#2c3e50'
    },
    customerContact: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    vehicleInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
    },
    vehicleIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    vehicleDetails: {
        flex: 1
    },
    vehicleType: {
        fontWeight: '600',
        color: '#2c3e50'
    },
    vehicleModel: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    serviceInfo: {
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
    },
    serviceType: {
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    serviceDescription: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        lineHeight: '1.4'
    },
    requestMeta: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        marginBottom: '1rem'
    },
    metaItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.85rem'
    },
    metaLabel: {
        color: '#7f8c8d',
        fontWeight: '500'
    },
    metaValue: {
        color: '#2c3e50',
        fontWeight: '600'
    },
    requestActions: {
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
    },
    viewButton: {
        flex: 1,
        padding: '0.5rem',
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
        borderBottom: '2px solid #007bff',
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
    },
    fullWidthDetail: {
        marginTop: '1rem'
    },
    detailDescription: {
        marginTop: '0.5rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        lineHeight: '1.5',
        color: '#2c3e50'
    },
    adminNotes: {
        padding: '1rem',
        backgroundColor: '#e8f4f8',
        borderRadius: '8px',
        borderLeft: '4px solid #007bff',
        lineHeight: '1.5',
        color: '#2c3e50'
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

export default ServiceRequestManagementPage;
