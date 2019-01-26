/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { clear } from 'local-storage';
import axios from '../../utils/axios';

const state = {
  status: null,
  token: null,
  user: {
    name: null,
    email: null,
  },
};

const getters = {
  isAuthenticated(state) {
    if (state.token) {
      return true;
    }

    return false;
  },
};

const mutations = {
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

    // Set in local storage
    localStorage.setItem('token', token);
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
};

const actions = {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/me')
        .then((res) => {
          const { name, email } = res.data.data;

          commit('SET_USER', {
            name,
            email,
          });

          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  login({ commit, dispatch }, { data }) {
    return new Promise((resolve, reject) => {
      axios.post('/login', data)
        .then((res) => {
          const { token } = res.data.data;

          commit('SET_STATUS_SUCCESS');
          commit('SET_TOKEN', token);

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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
