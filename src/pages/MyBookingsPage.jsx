// client/src/pages/MyBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../api/transportationApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast.error("You need to be logged in to view your bookings.");
            setLoading(false);
            return;
        }
        
        const fetchBookings = async () => {
            try {
                const response = await getMyBookings(token);
                setBookings(response.data.data.bookings);
            } catch (error) {
                toast.error("Failed to fetch bookings.");
            }
            setLoading(false);
        };

        fetchBookings();
    }, [token]);

    if (loading) return <p style={{textAlign: 'center', padding: '3rem'}}>Loading your bookings...</p>;

    if (!token) {
         return (
            <div style={{textAlign: 'center', padding: '3rem'}}>
                <h2>Please Login</h2>
                <p>You need to be logged in to see your bookings.</p>
                <Link to="/login" style={{color: '#007bff'}}>Go to Login</Link>
            </div>
        );
    }
    
    return (
        <div style={styles.page}>
            <Toaster position="top-center" />
            <h1 style={styles.title}>My Bookings</h1>
            {bookings.length === 0 ? (
                <p style={{textAlign: 'center'}}>You have no bookings yet.</p>
            ) : (
                <div style={styles.list}>
                    {bookings.map(booking => (
                        <div key={booking._id} style={styles.card}>
                            <h4>{booking.route.from} to {booking.route.to}</h4>
                            <p><strong>Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
                            <p><strong>Vehicle:</strong> {booking.vehicle.name} ({booking.vehicle.registrationNumber})</p>
                            <p><strong>Seats:</strong> {booking.bookedSeats.map(s => s.seatNumber).join(', ')}</p>
                            <p><strong>Total Price:</strong> NPR {booking.totalPrice}</p>
                            <span style={{...styles.status, backgroundColor: booking.paymentStatus === 'Completed' ? 'green' : 'orange'}}>
                                {booking.paymentStatus}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { maxWidth: '1000px', margin: '2rem auto', padding: '0 2rem' },
    title: { borderBottom: '2px solid #007bff', paddingBottom: '0.5rem', marginBottom: '2rem' },
    list: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    card: { border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', position: 'relative', backgroundColor: '#fff' },
    status: {
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        padding: '0.3rem 0.8rem', color: 'white', borderRadius: '12px', fontSize: '0.9rem'
    }
};

export default MyBookingsPage;