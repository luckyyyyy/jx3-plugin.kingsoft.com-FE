export default [
  {
    path: '/DBM',
    component: () => import('@/views/DBM/main.vue'),
    children: [
      {
        path: '',
        name: 'DBM_index',
        component: () => import('@/views/DBM/index.vue'),
      },
      {
        path: 'me',
        meta: { requiresAuth: true },
        name: 'DBM_me',
        component: () => import('@/views/DBM/me.vue'),
      },
      {
        path: 'upload/:id(\\d+)?',
        meta: { requiresAuth: true },
        name: 'DBM_upload',
        component: () => import('@/views/DBM/upload.vue'),
      },
      {
        path: ':id(\\d+)',
        meta: { name: '数据详情' },
        name: 'DBM_detail',
        component: () => import('@/views/DBM/detail.vue'),
      },
    ],
  },
];
