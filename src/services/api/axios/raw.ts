import axios from 'axios';

const isServer = typeof window === 'undefined';
const baseURL = isServer ? process.env.API_BASE_URL : '/api';

export const rawAxios = axios.create({
  baseURL,
  withCredentials: true,
});
