// client/src/api/transportationApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5050/api/transport';

const searchVehicles = (from, to, date) => {
    return axios.get(`${API_URL}/search`, {
        params: { from, to, date }
    });
};

const createBooking = (bookingData, token) => {
    return axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getMyBookings = (token) => {
    return axios.get(`${API_URL}/my-bookings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export { searchVehicles, createBooking, getMyBookings };