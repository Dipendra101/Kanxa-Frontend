// client/src/pages/GarageStorePage.jsx
import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/constructionApi'; // We can reuse the same API call
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const GarageStorePage = () => {
    const [garageProducts, setGarageProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            try {
                const { data } = await getProducts();
                // Filter products to only show the 'Garage & Workshop' category
                const filteredProducts = data.data.products.filter(
                    product => product.category === 'Garage & Workshop'
                );
                setGarageProducts(filteredProducts);
            } catch (error) {
                toast.error("Failed to load workshop products.");
            }
            setLoading(false);
        };
        fetchAndFilterProducts();
    }, []);

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading Workshop Store...</p>;

    return (
        <div style={styles.page}>
            <Toaster />
            <header style={styles.header}>
                <h1>Garage Tools & Parts</h1>
                <p>Everything you need to keep your machinery in top condition.</p>
            </header>
            
            {garageProducts.length > 0 ? (
                <div style={styles.grid}>
                    {garageProducts.map(product => (
                        <ProductCard key={product._id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            ) : (
                 <div style={{textAlign: 'center', padding: '3rem'}}>
                    <h2>Coming Soon!</h2>
                    <p>Our online store for garage tools and parts is under construction.</p>
                </div>
            )}
        </div>
    );
};

// This is the same ProductCard component from the Construction page for a consistent UI
const ProductCard = ({ product, addToCart }) => (
    <div style={cardStyles.card}>
        <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <img src={product.images[0] || 'https://via.placeholder.com/300'} alt={product.name} style={cardStyles.image} />
            <h3 style={cardStyles.name}>{product.name}</h3>
            <p style={cardStyles.category}>{product.category}</p>
        </Link>
        <div style={cardStyles.footer}>
            <span style={cardStyles.price}>NPR {product.price}</span>
            <button onClick={() => { addToCart(product); toast.success(`${product.name} added to cart!`); }} style={cardStyles.button}>Add to Cart</button>
        </div>
    </div>
);

const styles = {
    page: { backgroundColor: '#f9fafb', minHeight: '100vh' },
    header: { textAlign: 'center', padding: '3rem 2rem', backgroundColor: '#fff' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }
};

const cardStyles = {
    card: { backgroundColor: '#fff', border: '1px solid #e7e7e7', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    image: { width: '100%', height: '200px', objectFit: 'cover' },
    name: { fontSize: '1.2rem', margin: '1rem 1rem 0.5rem' },
    category: { color: '#666', margin: '0 1rem 1rem', fontSize: '0.9rem' },
    footer: { marginTop: 'auto', padding: '1rem', borderTop: '1px solid #e7e7e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: '1.2rem', fontWeight: 'bold' },
    button: { padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default GarageStorePage;