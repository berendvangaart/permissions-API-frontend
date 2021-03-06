import {RouteRecordRaw} from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/SetupLayout.vue'),
    children: [
      {
        name: 'welcomeSetup',
        path: '/setup',
        component: () => import('pages/WelcomeSetup.vue')
      },
    ],
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
        name: 'apis',
        component: () => import('pages/ApiView.vue')
      },
      {
        path: '/apicreate',
        name: 'ApiCreate',
        component: () => import('pages/ApiCreate.vue')
      },
      {
        path: '/api/:id/routes',
        name: 'apiRoute',
        component: () => import('pages/ApiRoute.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('pages/UsersView.vue')
      },
      {
        path: '/user/:id/edit',
        name: 'userView',
        component: () => import('pages/UserView.vue')
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
