import Vue from 'vue';
import VueRouter from 'vue-router';

import dashboard from './modules/dashboard';
import auth from './modules/auth';
import other from './modules/other';

import authGuard from '../middlewares/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...auth,
    ...dashboard,
    ...other,
  ],
});

// Global Middleware
authGuard(router);

export default router;
