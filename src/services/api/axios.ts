import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith('/api/')) {
    config.url = config.url.replace(/^\/api/, '');
  }
  return config;
});
