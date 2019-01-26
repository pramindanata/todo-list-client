import store from '../stores/index';

export default router => router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    if (store.state.layout.current !== 'dashboard') {
      store.dispatch('layout/update', 'dashboard');
    }

    if (to.name === 'login' || to.name === 'register') {
      return next({ name: 'dashboard' });
    }

    return next();
  }

  if (store.state.layout.current !== 'auth') {
    store.dispatch('layout/update', 'auth');
  }

  if (to.name === 'login' || to.name === 'register') {
    return next();
  }

  return next({ name: 'login' });
});
