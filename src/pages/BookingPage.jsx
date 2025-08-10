// client/src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking } from '../api/transportationApi';
import { Toaster, toast } from 'react-hot-toast';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle, searchParams } = location.state || {};
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(false);

    if (!vehicle) {
        return (
            <div style={{textAlign: 'center', padding: '3rem'}}>
                <h2>Vehicle data not found.</h2>
                <p>Please go back and search again.</p>
                <Link to="/transportation">Go Back</Link>
            </div>
        );
    }
    
    const toggleSeat = (seatNumber) => {
        setSelectedSeats(prev => 
            prev.includes(seatNumber) 
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handleConfirmBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You must be logged in to book seats.");
            return navigate('/login');
        }
        if (selectedSeats.length === 0) {
            return toast.error("Please select at least one seat.");
        }

        setLoading(true);
        const bookingData = {
            vehicleId: vehicle._id,
            routeId: vehicle.route._id,
            travelDate: searchParams.date,
            seats: selectedSeats.map(seatNumber => ({ seatNumber }))
        };

        try {
            await createBooking(bookingData, token);
            toast.success("Booking successful! You will be redirected shortly.");
            // In a real app, you would redirect to eSewa/Khalti here.
            setTimeout(() => navigate('/my-bookings'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Booking failed.");
        }
        setLoading(false);
    };

    const totalPrice = selectedSeats.length * vehicle.route.basePrice;

    return (
        <div style={styles.page}>
            <Toaster position="top-center" />
            <h1 style={{textAlign: 'center'}}>Book Your Seat</h1>
            <div style={styles.container}>
                <div style={styles.seatMap}>
                    <h3 style={{textAlign: 'center'}}>Select Your Seat(s)</h3>
                    <div style={styles.mapGrid}>
                        {vehicle.seats.map(seat => (
                            <Seat 
                                key={seat.seatNumber} 
                                seat={seat} 
                                isBooked={vehicle.bookedSeatNumbers.includes(seat.seatNumber)}
                                isSelected={selectedSeats.includes(seat.seatNumber)}
                                onToggle={toggleSeat}
                            />
                        ))}
                    </div>
                    <div style={styles.legend}>
                        <div style={styles.legendItem}><span style={{...styles.seatBox, ...styles.available}}></span> Available</div>
                        <div style={styles.legendItem}><span style={{...styles.seatBox, ...styles.selected}}></span> Selected</div>
                        <div style={styles.legendItem}><span style={{...styles.seatBox, ...styles.booked}}></span> Booked</div>
                    </div>
                </div>

                <div style={styles.summary}>
                    <h3>Booking Summary</h3>
                    <p><strong>Vehicle:</strong> {vehicle.name}</p>
                    <p><strong>Route:</strong> {vehicle.route.from} to {vehicle.route.to}</p>
                    <p><strong>Date:</strong> {new Date(searchParams.date).toLocaleDateString()}</p>
                    <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
                    <hr style={{margin: '1rem 0'}} />
                    <h4 style={{fontSize: '1.5rem'}}>Total Price: NPR {totalPrice}</h4>
                    <button onClick={handleConfirmBooking} style={styles.button} disabled={loading}>
                        {loading ? 'Confirming...' : 'Confirm & Proceed to Pay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Seat = ({ seat, isBooked, isSelected, onToggle }) => {
    let style = styles.available;
    if (isBooked) style = styles.booked;
    if (isSelected) style = styles.selected;

    return (
        <div 
            style={{...styles.seatBox, ...style}}
            onClick={() => !isBooked && onToggle(seat.seatNumber)}
        >
            {seat.seatNumber}
        </div>
    );
};

const styles = {
    page: { maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' },
    container: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
    seatMap: { flex: 2, minWidth: '400px', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#fff' },
    summary: { flex: 1, minWidth: '300px', border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', backgroundColor: '#f9fafb', alignSelf: 'flex-start' },
    mapGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '300px', margin: '2rem auto' },
    seatBox: {
        width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '4px', cursor: 'pointer', userSelect: 'none',
        fontWeight: 'bold',
    },
    available: { border: '1px solid green', color: 'green' },
    selected: { backgroundColor: 'orange', color: 'white', border: '1px solid orange' },
    booked: { backgroundColor: '#ccc', color: '#666', cursor: 'not-allowed', border: '1px solid #ccc' },
    legend: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '5px' },
    button: { width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.2rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default BookingPage;