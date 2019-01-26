/* eslint-disable no-param-reassign */
import { set, clear } from 'local-storage';
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
      if (state.token) {
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
    login({ commit, dispatch }, { data }) {
      return new Promise((resolve, reject) => {
        axios.post('/login', data)
          .then((res) => {
            const { token } = res.data.data;

            commit('SET_STATUS_SUCCESS');
            commit('SET_TOKEN', token);

            // Set in local storage
            set('token', token);

            dispatch('layout/update', 'dashboard', { root: true });

            resolve(res);
          })
          .catch(err => reject(err));
      });
    },
    logout({ commit, dispatch }) {
      commit('SET_STATUS_FAILED');
      commit('REMOVE_TOKEN');
      commit('REMOVE_USER');

      // Clear local storage
      clear();

      dispatch('layout/update', 'auth', { root: true });
    },
  },
};
