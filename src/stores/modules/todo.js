/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

import Vue from 'vue';
import axios from '../../utils/axios';

const state = {
  todos: [],
};

const getters = {

};

const mutations = {
  REMOVE_TODO(state, id) {
    // eslint-disable-next-line no-underscore-dangle
    const index = state.todos.findIndex(item => item._id === id);

    state.todos.splice(index, 1);
  },
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  UNSHIFT_TODO(state, todo) {
    state.todos.unshift(todo);
  },
  UPDATE_TODO(state, todo) {
    // eslint-disable-next-line no-underscore-dangle
    const index = state.todos.findIndex(item => item._id === todo._id);

    Vue.set(state.todos, index, todo);
  },
};

const actions = {
  restIndex({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/todos')
        .then((res) => {
          const { data } = res.data;

          commit('SET_TODOS', data);

          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  restRemove({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`/todos/${id}`)
        .then((res) => {
          commit('REMOVE_TODO', id);

          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  restStore({ commit }, todo) {
    return new Promise((resolve, reject) => {
      axios.post('/todos', {
        title: todo.title || null,
      }).then((res) => {
        const { data } = res.data;

        commit('UNSHIFT_TODO', data);

        resolve(res);
      }).catch(err => reject(err));
    });
  },
  restToggle({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.put(`/todos/${id}/toggle`)
        .then((res) => {
          const { data } = res.data;

          commit('UPDATE_TODO', data);

          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
