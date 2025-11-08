import axios from 'axios';

// Create a new axios instance
const api = axios.create({
  baseURL: '/api', // This uses the proxy
});

// Add a request interceptor
// This function will run BEFORE every API request
api.interceptors.request.use(
  (config) => {
    // 1. Get the user object from localStorage
    const user = JSON.parse(localStorage.getItem('eximiusUser'));

    if (user && user.token) {
      // 2. If user exists, add the token to the Authorization header
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
