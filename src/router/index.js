import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

const demoRoutes = []

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/Signup.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
        },
        {
          name: 'dqcmodel',
          path: 'dqcmodel',
          component: () => import('../components/cruds/DQCMODEL/List.vue'),
        },
        {
          name: 'dqcmodel-edit',
          path: 'dqcmodel/edit/:id',
          component: () => import('../components/cruds/DQCMODEL/Form.vue'),
          props: true,
        },
        {
          name: 'dqcmodel-create',
          path: 'dqcmodel/create',
          component: () => import('../components/cruds/DQCMODEL/Form.vue'),
          props: true,
        },
        {
          name: 'dqc84',
          path: 'dqc84',
          component: () => import('../components/cruds/DQC84/List.vue'),
        },
        {
          name: 'dqc84-edit',
          path: 'dqc84/edit/:id',
          component: () => import('../components/cruds/DQC84/Form.vue'),
          props: true,
        },
        {
          name: 'dqc84-create',
          path: 'dqc84/create',
          component: () => import('../components/cruds/DQC84/Form.vue'),
          props: true,
        },
        {
          name: 'dqc841',
          path: 'dqc841',
          component: () => import('../components/cruds/DQC841/List.vue'),
        },
        {
          name: 'dqc841-edit',
          path: 'dqc841/edit/:id',
          component: () => import('../components/cruds/DQC841/Form.vue'),
          props: true,
        },
        {
          name: 'dqc841-create',
          path: 'dqc841/create',
          component: () => import('../components/cruds/DQC841/Form.vue'),
          props: true,
        },
        {
          name: 'reports',
          path: 'reports',
          component: () => import('../components/cruds/GeneralReport.vue'),
        },
      ],
    },
  ],
})
