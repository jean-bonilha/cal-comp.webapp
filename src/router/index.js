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
          default: true,
        },
      ],
    },
  ],
})
