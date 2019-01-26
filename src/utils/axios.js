/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

axios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
