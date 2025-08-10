// client/src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/constructionApi';
import { useCart } from '../context/CartContext';
import { Toaster, toast } from 'react-hot-toast';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductDetails(id);
                setProduct(data.data.product);
            } catch (error) {
                toast.error("Failed to load product details.");
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading Product...</p>;
    if (!product) return <p style={{textAlign: 'center', padding: '3rem'}}>Product not found.</p>;

    return (
        <div style={styles.page}>
            <Toaster />
            <div style={styles.container}>
                <div style={styles.imageSection}>
                    <img src={product.images[0] || 'https://via.placeholder.com/500'} alt={product.name} style={styles.image} />
                </div>
                <div style={styles.detailsSection}>
                    <h1 style={styles.name}>{product.name}</h1>
                    <p style={styles.category}>{product.category}</p>
                    <hr style={styles.hr} />
                    <p style={styles.description}>{product.description}</p>
                    <p style={styles.stock}>Stock: {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of Stock'}</p>
                    <div style={styles.priceBox}>
                        <span style={styles.price}>NPR {product.price}</span>
                        <span style={styles.unit}>/ {product.unit}</span>
                    </div>
                    <button 
                        onClick={() => { addToCart(product); toast.success(`${product.name} added to cart!`); }}
                        style={styles.button} 
                        disabled={product.stockQuantity === 0}
                    >
                        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { maxWidth: '1200px', margin: '2rem auto', padding: '2rem' },
    container: { display: 'flex', gap: '3rem', flexWrap: 'wrap' },
    imageSection: { flex: 1, minWidth: '300px' },
    image: { width: '100%', borderRadius: '8px' },
    detailsSection: { flex: 1.5, minWidth: '300px' },
    name: { fontSize: '2.5rem', margin: 0 },
    category: { color: '#666', fontSize: '1.1rem', margin: '0.5rem 0' },
    hr: { border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' },
    description: { lineHeight: '1.7', color: '#333' },
    stock: { fontWeight: 'bold', color: 'green' },
    priceBox: { margin: '2rem 0', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' },
    price: { fontSize: '2rem', fontWeight: 'bold', marginRight: '0.5rem' },
    unit: { fontSize: '1rem', color: '#666' },
    button: { width: '100%', padding: '1rem', fontSize: '1.2rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ProductDetailPage;