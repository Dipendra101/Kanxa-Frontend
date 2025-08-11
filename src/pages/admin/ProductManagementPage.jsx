import React, { useState, useEffect } from 'react';
import { getAllAdminProducts } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getAllAdminProducts();
            // Mock data if API is not ready
            const mockProducts = [
                {
                    _id: '1',
                    name: 'Premium Cement - OPC 53 Grade',
                    category: 'Cement',
                    description: 'High-quality Ordinary Portland Cement suitable for all construction needs',
                    price: 850,
                    stock: 250,
                    unit: 'bag',
                    status: 'In Stock',
                    supplier: 'Everest Cement',
                    sku: 'CEM-OPC53-001',
                    images: ['cement1.jpg', 'cement2.jpg'],
                    specifications: {
                        weight: '50kg',
                        grade: '53',
                        compressiveStrength: '53 MPa'
                    },
                    sales: 145,
                    revenue: 123250,
                    lastUpdated: '2024-02-10',
                    discount: 5
                },
                {
                    _id: '2',
                    name: 'Steel Rebar TMT Grade 500',
                    category: 'Steel',
                    description: 'Thermo-mechanically treated steel bars for reinforcement',
                    price: 95,
                    stock: 0,
                    unit: 'kg',
                    status: 'Out of Stock',
                    supplier: 'Steel Authority',
                    sku: 'STL-TMT500-002',
                    images: ['rebar1.jpg'],
                    specifications: {
                        diameter: '12mm',
                        grade: '500',
                        length: '12m'
                    },
                    sales: 89,
                    revenue: 8455,
                    lastUpdated: '2024-02-08',
                    discount: 0
                },
                {
                    _id: '3',
                    name: 'Red Clay Bricks',
                    category: 'Bricks',
                    description: 'High-quality red clay bricks for construction',
                    price: 15,
                    stock: 5000,
                    unit: 'piece',
                    status: 'In Stock',
                    supplier: 'Local Brick Factory',
                    sku: 'BRK-RCL-003',
                    images: ['brick1.jpg'],
                    specifications: {
                        size: '230x110x75mm',
                        compressiveStrength: '3.5 MPa',
                        waterAbsorption: '20%'
                    },
                    sales: 2340,
                    revenue: 35100,
                    lastUpdated: '2024-02-09',
                    discount: 10
                },
                {
                    _id: '4',
                    name: 'PVC Water Pipes 4 inch',
                    category: 'Pipes',
                    description: 'Durable PVC pipes for water supply systems',
                    price: 450,
                    stock: 120,
                    unit: 'meter',
                    status: 'Low Stock',
                    supplier: 'Pipe Industries',
                    sku: 'PIP-PVC4-004',
                    images: ['pipe1.jpg'],
                    specifications: {
                        diameter: '4 inch',
                        pressure: '10 kg/cm²',
                        material: 'PVC'
                    },
                    sales: 67,
                    revenue: 30150,
                    lastUpdated: '2024-02-07',
                    discount: 0
                }
            ];
            setProducts(data?.products || mockProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products');
        }
        setLoading(false);
    };

    const categories = ['all', 'Cement', 'Steel', 'Bricks', 'Pipes', 'Tools', 'Hardware'];
    const statusOptions = ['all', 'In Stock', 'Low Stock', 'Out of Stock'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name);
            case 'price': return a.price - b.price;
            case 'stock': return b.stock - a.stock;
            case 'sales': return b.sales - a.sales;
            default: return 0;
        }
    });

    const getStatusColor = (status, stock) => {
        if (status === 'Out of Stock' || stock === 0) return '#e74c3c';
        if (status === 'Low Stock' || stock < 50) return '#f39c12';
        return '#2ecc71';
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return 'Out of Stock';
        if (stock < 50) return 'Low Stock';
        return 'In Stock';
    };

    const updateProductStatus = (productId, newStatus) => {
        setProducts(products.map(product => 
            product._id === productId 
                ? { ...product, status: newStatus }
                : product
        ));
        toast.success(`Product status updated to ${newStatus}`);
    };

    const deleteProduct = (productId) => {
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully');
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Toaster position="top-center" />
            
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Product Management</h1>
                    <p style={styles.subtitle}>Manage your construction supplies inventory</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    style={styles.addButton}
                >
                    + Add Product
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filtersContainer}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search products, SKU, or supplier..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                <div style={styles.filterGroup}>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={styles.filterSelect}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
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
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="stock">Sort by Stock</option>
                        <option value="sales">Sort by Sales</option>
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>📦</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{products.length}</div>
                        <div style={styles.summaryLabel}>Total Products</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>✅</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{products.filter(p => getStockStatus(p.stock) === 'In Stock').length}</div>
                        <div style={styles.summaryLabel}>In Stock</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>⚠️</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{products.filter(p => getStockStatus(p.stock) === 'Low Stock').length}</div>
                        <div style={styles.summaryLabel}>Low Stock</div>
                    </div>
                </div>
                <div style={styles.summaryCard}>
                    <div style={styles.summaryIcon}>❌</div>
                    <div style={styles.summaryContent}>
                        <div style={styles.summaryValue}>{products.filter(p => getStockStatus(p.stock) === 'Out of Stock').length}</div>
                        <div style={styles.summaryLabel}>Out of Stock</div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div style={styles.productsContainer}>
                <div style={styles.productsGrid}>
                    {sortedProducts.map((product) => (
                        <div key={product._id} style={styles.productCard}>
                            <div style={styles.productHeader}>
                                <div style={styles.productImage}>
                                    📦
                                </div>
                                <div style={{
                                    ...styles.statusBadge,
                                    backgroundColor: getStatusColor(product.status, product.stock)
                                }}>
                                    {getStockStatus(product.stock)}
                                </div>
                            </div>

                            <div style={styles.productInfo}>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <p style={styles.productDescription}>{product.description}</p>
                                <div style={styles.productMeta}>
                                    <span style={styles.productCategory}>{product.category}</span>
                                    <span style={styles.productSku}>SKU: {product.sku}</span>
                                </div>
                            </div>

                            <div style={styles.productPricing}>
                                <div style={styles.priceInfo}>
                                    <span style={styles.price}>NPR {product.price.toLocaleString()}</span>
                                    <span style={styles.unit}>per {product.unit}</span>
                                </div>
                                {product.discount > 0 && (
                                    <div style={styles.discount}>{product.discount}% OFF</div>
                                )}
                            </div>

                            <div style={styles.productStats}>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Stock:</span>
                                    <span style={{
                                        ...styles.statValue,
                                        color: getStatusColor(product.status, product.stock)
                                    }}>
                                        {product.stock} {product.unit}s
                                    </span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Sales:</span>
                                    <span style={styles.statValue}>{product.sales} units</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Revenue:</span>
                                    <span style={styles.statValue}>NPR {product.revenue.toLocaleString()}</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statLabel}>Supplier:</span>
                                    <span style={styles.statValue}>{product.supplier}</span>
                                </div>
                            </div>

                            <div style={styles.productSpecs}>
                                <h4 style={styles.specsTitle}>Specifications:</h4>
                                <div style={styles.specsList}>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} style={styles.specItem}>
                                            <span style={styles.specKey}>{key}:</span>
                                            <span style={styles.specValue}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.productActions}>
                                <button 
                                    onClick={() => setSelectedProduct(product)}
                                    style={styles.actionButton}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => toast.success('Stock updated')}
                                    style={{...styles.actionButton, backgroundColor: '#3498db'}}
                                >
                                    Restock
                                </button>
                                <button 
                                    onClick={() => deleteProduct(product._id)}
                                    style={{...styles.actionButton, backgroundColor: '#e74c3c'}}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedProducts.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>📦</div>
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Add New Product</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                style={styles.closeButton}
                            >
                                ✕
                            </button>
                        </div>
                        <div style={styles.modalContent}>
                            <p>Product form would go here with fields for:</p>
                            <ul>
                                <li>Product name and description</li>
                                <li>Category and SKU</li>
                                <li>Price and unit</li>
                                <li>Stock quantity</li>
                                <li>Supplier information</li>
                                <li>Specifications</li>
                                <li>Product images</li>
                            </ul>
                        </div>
                        <div style={styles.modalActions}>
                            <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>Cancel</button>
                            <button onClick={() => {setShowAddModal(false); toast.success('Product added successfully!')}} style={styles.saveButton}>Save Product</button>
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
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    summaryLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    },
    productsContainer: {
        padding: '2rem'
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
    },
    productHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    },
    productImage: {
        fontSize: '3rem',
        color: '#bdc3c7'
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    productInfo: {
        marginBottom: '1rem'
    },
    productName: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '0 0 0.5rem 0'
    },
    productDescription: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        lineHeight: '1.4',
        margin: '0 0 0.5rem 0'
    },
    productMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#95a5a6'
    },
    productCategory: {
        backgroundColor: '#ecf0f1',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        color: '#2c3e50'
    },
    productSku: {
        fontWeight: '500'
    },
    productPricing: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    priceInfo: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem'
    },
    price: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    unit: {
        fontSize: '0.8rem',
        color: '#7f8c8d'
    },
    discount: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 'bold'
    },
    productStats: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem',
        marginBottom: '1rem'
    },
    statItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.85rem'
    },
    statLabel: {
        color: '#7f8c8d',
        fontWeight: '500'
    },
    statValue: {
        color: '#2c3e50',
        fontWeight: '600'
    },
    productSpecs: {
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    specsTitle: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '0 0 0.5rem 0'
    },
    specsList: {
        display: 'grid',
        gap: '0.25rem'
    },
    specItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem'
    },
    specKey: {
        color: '#7f8c8d',
        textTransform: 'capitalize'
    },
    specValue: {
        color: '#2c3e50',
        fontWeight: '500'
    },
    productActions: {
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
        maxWidth: '600px',
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
    modalActions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        padding: '1.5rem',
        borderTop: '1px solid #e9ecef'
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

export default ProductManagementPage;
