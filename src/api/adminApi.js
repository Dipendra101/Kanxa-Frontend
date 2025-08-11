// client/src/api/adminApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5050/api/admin';

const getToken = () => localStorage.getItem('token');

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

// --- Dashboard ---
export const getDashboardStats = () => {
    return axios.get(`${API_URL}/dashboard/stats`, getAuthHeaders());
};

// --- Transportation Management ---
export const getAllDrivers = () => axios.get(`${API_URL}/transport/drivers`, getAuthHeaders());
export const getAllVehicles = () => axios.get(`${API_URL}/transport/vehicles`, getAuthHeaders());
export const getAllAdminBookings = () => axios.get(`${API_URL}/transport/bookings`, getAuthHeaders());

// --- Product Management ---
export const getAllAdminProducts = () => axios.get(`${API_URL}/products`, getAuthHeaders());
export const createProduct = (productData) => axios.post(`${API_URL}/products`, productData, getAuthHeaders());

// --- NEWLY ADDED ---
export const updateProduct = (id, productData) => {
    return axios.put(`${API_URL}/products/${id}`, productData, getAuthHeaders());
};

export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/products/${id}`, getAuthHeaders());
};
// --- END OF NEWLY ADDED ---

// --- Order Management ---
export const getAllOrders = () => axios.get(`${API_URL}/orders`, getAuthHeaders());
export const updateOrderStatus = (id, status) => axios.put(`${API_URL}/orders/${id}/status`, { status }, getAuthHeaders());

// --- Service Request Management ---
export const getAllServiceRequests = () => axios.get(`${API_URL}/garage/requests`, getAuthHeaders());
export const updateServiceRequestStatus = (id, status, adminNotes) => axios.put(`${API_URL}/garage/requests/${id}`, { status, adminNotes }, getAuthHeaders());