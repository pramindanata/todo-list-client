/* eslint-disable no-param-reassign */
export default {
  namespaced: true,
  state: {
    // 'auth' OR 'dashboard'
    current: 'auth',
  },
  mutations: {
    SET_CURRENT_LAYOUT(state, payload) {
      state.current = payload;
    },
  },
  actions: {
    update({ commit }, layoutName) {
      if (layoutName === 'auth' || layoutName === 'dashboard') {
        commit('SET_CURRENT_LAYOUT', layoutName);
      } else {
        throw new Error('Invalid layout value given');
      }
    },
  },
};
