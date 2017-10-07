export default [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue'),
  },
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import('@/views/404.vue'),
  // },
];
