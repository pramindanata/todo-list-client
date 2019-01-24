/* eslint-disable no-param-reassign */
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
    login({ commit }) {
      commit('SET_STATUS_SUCCESS');
      commit('SET_TOKEN', 123213123);
      commit('SET_USER', {
        name: 'Eksa',
        email: 'pramindanata.eksa@gmail.com',
      });
    },
    logout({ commit }) {
      commit('REMOVE_TOKEN');
      commit('REMOVE_USER');
    },
  },
};
