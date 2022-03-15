import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        name: 'home',
        path: '/index',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/createUser',
        name: 'adminCreateUser',
        component: () => import('pages/AdminCreateUser.vue')
      },
      {
        path: '/api',
        name: 'api',
        component: () => import('pages/ApiView.vue')
      },
      {
        path: '/api/:id/routes',
        name: 'ApiRoute',
        component: () => import('pages/ApiRoute.vue')
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },

    ],
  },
];

export default routes;
