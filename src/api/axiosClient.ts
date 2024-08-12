import axios from 'axios';
import { getActions } from '../store/app-store';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    WithCredentials: true,
    withXSRFToken: true,
  },
});

instance.interceptors.request.use(async (config) => {
  const { getAccessToken } = getActions();

  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
