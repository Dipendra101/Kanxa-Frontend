// client/src/api/constructionApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

// --- Product Endpoints ---
export const getProducts = () => {
    return axios.get(`${API_URL}/products`);
};

export const getProductDetails = (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};

// --- Order Endpoints ---
export const createOrder = (orderData, token) => {
    return axios.post(`${API_URL}/products/orders`, orderData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMyOrders = (token) => {
    return axios.get(`${API_URL}/products/my-orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};