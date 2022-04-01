import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
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
        path: '/roles',
        name: 'roles',
        component: () => import('pages/RolesView.vue')
      },
      {
        path: '/roles/:id',
        name: 'role',
        component: () => import('pages/RoleView.vue')
      },
      {
        path: '/api',
        name: 'api',
        component: () => import('pages/ApiView.vue')
      },
      {
        path: '/createApi',
        name: 'CreateApi',
        component: () => import('pages/CreateApi.vue')
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
