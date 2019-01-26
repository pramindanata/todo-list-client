import axios from 'axios';
// import store from '../stores/index';

axios.defaults.baseURL = 'http://localhost:4000';

// if (store.state.auth.token) {
//   Axios.defaults.headers.common.Authorization = `Bearer ${store.state.auth.token}`;
// }

export default axios;
