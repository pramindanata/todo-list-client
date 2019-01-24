import store from '../stores/index';

export default router => router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    store.dispatch('layout/updateLayout', 'dashboard');

    if (to.name === 'login' || to.name === 'register') {
      return next({ name: 'dashboard' });
    }

    return next();
  }

  store.dispatch('layout/updateLayout', 'auth');

  if (to.name === 'login' || to.name === 'register') {
    return next();
  }

  return next({ name: 'login' });
});
