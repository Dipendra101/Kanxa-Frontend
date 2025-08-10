// client/src/api/garageApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5050/api/garage';

const getToken = () => localStorage.getItem('token');

export const createServiceRequest = (requestData) => {
    const token = getToken();
    return axios.post(`${API_URL}/requests`, requestData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMyServiceRequests = () => {
    const token = getToken();
    return axios.get(`${API_URL}/my-requests`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};