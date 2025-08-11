import React, { useState, useEffect } from 'react';
import { getAllVehicles } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const VehicleManagementPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const { data } = await getAllVehicles();
            // Mock data if API is not ready
            const mockVehicles = [
                {
                    _id: '1',
                    name: 'Deluxe Bus KTM-01',
                    registrationNumber: 'BA 12 PA 3456',
                    type: 'Bus',
                    capacity: 45,
                    status: 'Active',
                    driver: 'Ram Bahadur',
                    route: 'Kathmandu - Pokhara',
                    lastMaintenance: '2024-01-15',
                    nextMaintenance: '2024-04-15',
                    fuelEfficiency: '8.5 km/l',
                    totalDistance: '125000 km'
                },
                {
                    _id: '2',
                    name: 'Cargo Truck LMG-02',
                    registrationNumber: 'BA 15 KHA 7890',
                    type: 'Truck',
                    capacity: 10,
                    status: 'Maintenance',
                    driver: 'Hari Sharma',
                    route: 'Lamjung - Kathmandu',
                    lastMaintenance: '2024-01-20',
                    nextMaintenance: '2024-04-20',
                    fuelEfficiency: '6.2 km/l',
                    totalDistance: '89000 km'
                },
                {
                    _id: '3',
                    name: 'Tourist Van PKR-03',
                    registrationNumber: 'GA 9 PA 2345',
                    type: 'Van',
                    capacity: 15,
                    status: 'Active',
                    driver: 'Sita Devi',
                    route: 'Custom Tours',
                    lastMaintenance: '2024-02-01',
                    nextMaintenance: '2024-05-01',
                    fuelEfficiency: '12.3 km/l',
                    totalDistance: '67000 km'
                }
            ];
            setVehicles(data?.vehicles || mockVehicles);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
            toast.error('Failed to load vehicles');
        }
        setLoading(false);
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || vehicle.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesType = filterType === 'all' || vehicle.type.toLowerCase() === filterType.toLowerCase();
        
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return '#2ecc71';
            case 'maintenance': return '#f39c12';
            case 'inactive': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const getTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'bus': return '🚌';
            case 'truck': return '🚛';
            case 'van': return '🚐';
            default: return '🚗';
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading vehicles...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Vehicle Management</h1>
                    <p style={styles.subtitle}>Manage your fleet of vehicles</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    style={styles.addButton}
                >
                    + Add Vehicle
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search vehicles, registration, or driver..."
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
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="all">All Types</option>
                        <option value="bus">Bus</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🚌</div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{vehicles.length}</div>
                        <div style={styles.statLabel}>Total Vehicles</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>✅</div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{vehicles.filter(v => v.status === 'Active').length}</div>
                        <div style={styles.statLabel}>Active</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🔧</div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{vehicles.filter(v => v.status === 'Maintenance').length}</div>
                        <div style={styles.statLabel}>In Maintenance</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>⚠️</div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{vehicles.filter(v => new Date(v.nextMaintenance) <= new Date(Date.now() + 30*24*60*60*1000)).length}</div>
                        <div style={styles.statLabel}>Due Maintenance</div>
                    </div>
                </div>
            </div>

            {/* Vehicles Grid */}
            <div style={styles.vehiclesGrid}>
                {filteredVehicles.map((vehicle) => (
                    <div key={vehicle._id} style={styles.vehicleCard}>
                        <div style={styles.vehicleHeader}>
                            <div style={styles.vehicleTypeIcon}>{getTypeIcon(vehicle.type)}</div>
                            <div style={styles.vehicleHeaderInfo}>
                                <h3 style={styles.vehicleName}>{vehicle.name}</h3>
                                <p style={styles.vehicleRegistration}>{vehicle.registrationNumber}</p>
                            </div>
                            <div style={{
                                ...styles.statusBadge,
                                backgroundColor: getStatusColor(vehicle.status)
                            }}>
                                {vehicle.status}
                            </div>
                        </div>

                        <div style={styles.vehicleInfo}>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Driver:</span>
                                <span style={styles.infoValue}>{vehicle.driver}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Route:</span>
                                <span style={styles.infoValue}>{vehicle.route}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Capacity:</span>
                                <span style={styles.infoValue}>{vehicle.capacity} passengers</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Fuel Efficiency:</span>
                                <span style={styles.infoValue}>{vehicle.fuelEfficiency}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Total Distance:</span>
                                <span style={styles.infoValue}>{vehicle.totalDistance}</span>
                            </div>
                        </div>

                        <div style={styles.maintenanceInfo}>
                            <div style={styles.maintenanceItem}>
                                <div style={styles.maintenanceLabel}>Last Service</div>
                                <div style={styles.maintenanceDate}>{new Date(vehicle.lastMaintenance).toLocaleDateString()}</div>
                            </div>
                            <div style={styles.maintenanceItem}>
                                <div style={styles.maintenanceLabel}>Next Service</div>
                                <div style={{
                                    ...styles.maintenanceDate,
                                    color: new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 30*24*60*60*1000) ? '#e74c3c' : '#2c3e50'
                                }}>
                                    {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div style={styles.vehicleActions}>
                            <button 
                                onClick={() => setSelectedVehicle(vehicle)}
                                style={styles.actionButton}
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => toast.success('Vehicle schedule viewed')}
                                style={{...styles.actionButton, backgroundColor: '#3498db'}}
                            >
                                Schedule
                            </button>
                            <button 
                                onClick={() => toast.success('Maintenance scheduled')}
                                style={{...styles.actionButton, backgroundColor: '#f39c12'}}
                            >
                                Maintain
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredVehicles.length === 0 && (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🚌</div>
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Add/Edit Modal would go here */}
            {showAddModal && (
                <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Vehicle</h2>
                        <p>Vehicle form would go here</p>
                        <div style={styles.modalActions}>
                            <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
                            <button onClick={() => {setShowAddModal(false); toast.success('Vehicle added successfully!')}} style={styles.saveButton}>Save</button>
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
    addButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
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
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'white'
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #e9ecef'
    },
    statIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    statContent: {
        flex: 1
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
    vehiclesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem',
        padding: '2rem'
    },
    vehicleCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
    },
    vehicleHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1rem'
    },
    vehicleTypeIcon: {
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
    },
    vehicleHeaderInfo: {
        flex: 1
    },
    vehicleName: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '0 0 0.25rem 0'
    },
    vehicleRegistration: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        margin: 0
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    vehicleInfo: {
        marginBottom: '1rem'
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
    },
    infoLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        fontWeight: '500'
    },
    infoValue: {
        fontSize: '0.9rem',
        color: '#2c3e50',
        fontWeight: '600'
    },
    maintenanceInfo: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        marginBottom: '1rem'
    },
    maintenanceItem: {
        textAlign: 'center'
    },
    maintenanceLabel: {
        fontSize: '0.75rem',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        marginBottom: '0.25rem'
    },
    maintenanceDate: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#2c3e50'
    },
    vehicleActions: {
        display: 'flex',
        gap: '0.5rem'
    },
    actionButton: {
        flex: 1,
        padding: '0.5rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
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
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    modalActions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        marginTop: '2rem'
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    saveButton: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#2ecc71',
        color: 'white',
        cursor: 'pointer'
    }
};

export default VehicleManagementPage;
