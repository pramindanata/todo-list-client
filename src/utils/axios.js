/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

let refreshSubscribers = []; // Store all waiting request
let isRefreshing = false;

// Restart all waiting request with new token
const restartAllReq = (token) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

// Refresh token func
const refreshToken = () => new Promise((resolve, reject) => {
  axios.get('/token')
    .then(res => resolve(res.data.data.token))
    .catch(err => reject(err));
});

// Register a waiting request
const registerWaitingReq = (cb) => {
  refreshSubscribers.push(cb);
};

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(res => res, (err) => {
  const { config, response } = err;
  const originalReq = config;

  if (!response) {
    return Promise.reject(err);
  }

  if (response.status === 401 && response.data === 'Unauthorized') {
    if (!isRefreshing) {
      isRefreshing = true;

      refreshToken()
        .then((newToken) => {
          localStorage.setItem('token', newToken);

          isRefreshing = false;

          restartAllReq(newToken);
        })
        // eslint-disable-next-line no-shadow
        .catch((err) => {
          throw new Error(err.message);
        });
    }

    const retryOriginalReq = new Promise((resolve) => {
      registerWaitingReq((token) => {
        originalReq.headers.Authorization = `Bearer ${token}`;

        resolve(axios(originalReq));
      });
    });

    return retryOriginalReq;
  }

  return Promise.reject(err);
});

export default axios;
