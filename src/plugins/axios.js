import Vue from 'vue';
import Axios from 'axios';
import store from '../stores/index';

Axios.defaults.baseURL = 'http://localhost:4000';

if (store.state.auth.token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${store.state.auth.token}`;
}

Vue.use({
  install: () => {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios });
  },
});
