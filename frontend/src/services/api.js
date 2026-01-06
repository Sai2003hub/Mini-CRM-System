import axios from 'axios';

const API = axios.create({
  baseURL: 'https://crm-backend-0i2h.onrender.com/api',
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Lead APIs
export const getLeads = () => API.get('/leads');
export const createLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);

// Deal APIs
export const getDeals = () => API.get('/deals');
export const convertLeadToDeal = (leadId, amount) => API.post(`/deals/convert/${leadId}`, { amount });
export const updateDeal = (id, data) => API.put(`/deals/${id}`, data);
export const deleteDeal = (id) => API.delete(`/deals/${id}`);
export const getDashboardStats = () => API.get('/deals/stats/dashboard');

export default API;