// client/src/pages/TransportationPage.jsx
import React, { useState } from 'react';
import { searchVehicles } from '../api/transportationApi';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const TransportationPage = () => {
    const [searchParams, setSearchParams] = useState({ from: 'Lamjung', to: 'Kathmandu', date: '' });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchParams.from || !searchParams.to || !searchParams.date) {
            return toast.error("Please fill in all fields.");
        }
        setLoading(true);
        setSearched(true);
        setSearchResults([]);
        try {
            const response = await searchVehicles(searchParams.from, searchParams.to, searchParams.date);
            setSearchResults(response.data.data.availableVehicles);
            if (response.data.data.availableVehicles.length === 0) {
                toast.success("No vehicles found for this route on the selected date.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to search for vehicles.");
            setSearchResults([]);
        }
        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <Toaster position="top-center" />
            <header style={styles.header}>
                <h1 style={styles.title}>Book Your Journey</h1>
                <p style={styles.subtitle}>Find and book your bus tickets with ease.</p>
            </header>

            <div style={styles.searchContainer}>
                <form onSubmit={handleSearch} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>From</label>
                        <select name="from" value={searchParams.from} onChange={handleInputChange} style={styles.input}>
                            <option value="Lamjung">Lamjung</option>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Pokhara">Pokhara</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label>To</label>
                        <select name="to" value={searchParams.to} onChange={handleInputChange} style={styles.input}>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Lamjung">Lamjung</option>
                            <option value="Pokhara">Pokhara</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Date</label>
                        <input type="date" name="date" value={searchParams.date} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>

            <div style={styles.resultsContainer}>
                {loading && <p style={{textAlign: 'center'}}>Loading...</p>}
                {!loading && searched && searchResults.length === 0 && (
                    <div style={styles.noResults}>No vehicles available for the selected route and date.</div>
                )}
                {!loading && searchResults.length > 0 && (
                    <div style={styles.grid}>
                        {searchResults.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} searchParams={searchParams} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const VehicleCard = ({ vehicle, searchParams }) => (
    <div style={cardStyles.card}>
        <div style={cardStyles.header}>
            <h3 style={cardStyles.name}>{vehicle.name} - {vehicle.registrationNumber}</h3>
            <span style={cardStyles.type}>{vehicle.type}</span>
        </div>
        <div style={cardStyles.body}>
            <p><strong>Route:</strong> {vehicle.route.from} to {vehicle.route.to}</p>
            <p><strong>Driver:</strong> {vehicle.driver ? vehicle.driver.name : 'Not Assigned'}</p>
            <p><strong>Price per Seat:</strong> NPR {vehicle.route.basePrice}</p>
        </div>
        <div style={cardStyles.footer}>
            <span style={cardStyles.seats}>
                {vehicle.availableSeats} / {vehicle.totalSeats} Seats Available
            </span>
            <Link
                to={`/book-seat/${vehicle._id}`}
                state={{ vehicle, searchParams }}
                style={cardStyles.button}
            >
                Book Now
            </Link>
        </div>
    </div>
);

const styles = {
    page: { fontFamily: 'inherit', color: '#333', minHeight: '100vh', backgroundColor: '#f4f7f6' },
    header: { backgroundColor: '#007bff', color: 'white', padding: '3rem 2rem', textAlign: 'center' },
    title: { margin: 0, fontSize: '2.5rem' },
    subtitle: { margin: '0.5rem 0 0', fontSize: '1.2rem', opacity: 0.9 },
    searchContainer: {
        maxWidth: '900px', margin: '-1.5rem auto 0',
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2,
    },
    form: { display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' },
    inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: '150px' },
    input: { padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
    button: {
        padding: '0.8rem 2rem', border: 'none', backgroundColor: '#28a745',
        color: 'white', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer'
    },
    resultsContainer: { maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' },
    noResults: { textAlign: 'center', padding: '2rem', fontSize: '1.2rem', color: '#666' }
};

const cardStyles = {
    card: { border: '1px solid #e7e7e7', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' },
    header: { backgroundColor: '#f9fafb', padding: '1rem', borderBottom: '1px solid #e7e7e7' },
    name: { margin: 0, fontSize: '1.2rem' },
    type: { fontSize: '0.9rem', color: '#666' },
    body: { padding: '1rem', flexGrow: 1 },
    footer: { padding: '1rem', borderTop: '1px solid #e7e7e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    seats: { fontWeight: 'bold', color: '#007bff' },
    button: {
        textDecoration: 'none', padding: '0.6rem 1.2rem', backgroundColor: '#007bff',
        color: 'white', borderRadius: '4px'
    }
};

export default TransportationPage;