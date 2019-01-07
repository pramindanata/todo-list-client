import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './dashboard';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    ...Dashboard,
  ],
});
