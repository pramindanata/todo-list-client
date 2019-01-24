export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../../pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../../pages/Register.vue'),
  },
];
