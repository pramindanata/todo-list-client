export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../../pages/dashboard/Index.vue'),
  },
  {
    path: '/dashboard',
    redirect: {
      name: 'dashboard',
    },
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../../pages/Demo.vue'),
  },
];
