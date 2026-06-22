import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

export const suratPerintahAPI = {
  create: (data: any) => api.post('/surat-perintah', data),
  list: (page?: number, limit?: number) => 
    api.get('/surat-perintah', { params: { page, limit } }),
  get: (id: string) => api.get(`/surat-perintah/${id}`),
  update: (id: string, data: any) => api.put(`/surat-perintah/${id}`, data),
  approve: (id: string) => api.post(`/surat-perintah/${id}/approve`),
  delete: (id: string) => api.delete(`/surat-perintah/${id}`),
};

export default api;
