// client/src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/constructionApi';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to place an order.");
            return navigate('/login');
        }
        setLoading(true);
        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.qty,
                price: item.price,
                image: item.images[0]
            })),
            shippingAddress: { // This should come from a form
                address: 'Sample Address, Lamjung',
                city: 'Besisahar',
                contactNumber: '9800000000',
            },
            totalPrice,
        };
        try {
            await createOrder(orderData, token);
            toast.success("Order placed successfully!");
            clearCart();
            navigate('/my-orders');
        } catch (error) {
            toast.error("Failed to place order.");
        }
        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <Toaster />
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>Your cart is empty. <Link to="/construction">Go Shopping</Link></div>
            ) : (
                <div style={styles.container}>
                    <div style={styles.cartItems}>
                        {cartItems.map(item => (
                            <div key={item._id} style={styles.item}>
                                <img src={item.images[0]} alt={item.name} style={styles.image} />
                                <div style={styles.details}><Link to={`/product/${item._id}`}>{item.name}</Link></div>
                                <div style={styles.price}>NPR {item.price}</div>
                                <input type="number" value={item.qty} onChange={e => updateQuantity(item._id, e.target.value)} min="1" style={styles.quantity} />
                                <div style={styles.subtotal}>NPR {item.qty * item.price}</div>
                                <button onClick={() => removeFromCart(item._id)} style={styles.removeBtn}>X</button>
                            </div>
                        ))}
                    </div>
                    <div style={styles.summary}>
                        <h2>Order Summary</h2>
                        <h3>Total: NPR {totalPrice.toFixed(2)}</h3>
                        <button onClick={handlePlaceOrder} style={styles.checkoutBtn} disabled={loading}>
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { maxWidth: '1400px', margin: '2rem auto', padding: '2rem' },
    container: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
    cartItems: { flex: 3 },
    summary: { flex: 1, backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', alignSelf: 'flex-start' },
    item: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' },
    image: { width: '80px', height: '80px', objectFit: 'cover' },
    details: { flex: 2 },
    price: { flex: 1 },
    quantity: { width: '60px', padding: '0.5rem', textAlign: 'center' },
    subtotal: { flex: 1, fontWeight: 'bold' },
    removeBtn: { border: 'none', background: 'red', color: 'white', cursor: 'pointer', padding: '0.5rem' },
    checkoutBtn: { width: '100%', padding: '1rem', fontSize: '1.2rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default CartPage;