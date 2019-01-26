/* eslint-disable no-param-reassign */
import axios from '../../utils/axios';

export default {
  namespaced: true,
  state: {
    status: null,
    token: null,
    user: {
      name: null,
      email: null,
    },
  },
  getters: {
    isAuthenticated(state) {
      if (state.status === 'success' && state.token && state.user.name && state.user.email) {
        return true;
      }

      return false;
    },
  },
  mutations: {
    SET_STATUS_SUCCESS(state) {
      state.status = 'success';
    },
    SET_STATUS_WAITING(state) {
      state.status = 'waiting';
    },
    SET_STATUS_FAILED(state) {
      state.status = 'failed';
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = {
        name: user.name,
        email: user.email,
      };
    },
    REMOVE_TOKEN(state) {
      state.token = null;
    },
    REMOVE_USER(state) {
      state.user = {
        name: null,
        email: null,
      };
    },
  },
  actions: {
    login({ commit }, { data }) {
      return new Promise((resolve, reject) => {
        axios.post('/login', data)
          .then((res) => {
            const { token, user } = res.data.data;

            commit('SET_STATUS_SUCCESS');
            commit('SET_TOKEN', token);
            commit('SET_USER', {
              name: user.name,
              email: user.email,
            });

            resolve(res);
          })
          .catch(err => reject(err));
      });
    },
    logout({ commit }) {
      commit('REMOVE_TOKEN');
      commit('REMOVE_USER');
    },
  },
};
