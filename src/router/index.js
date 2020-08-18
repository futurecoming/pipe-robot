import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import * as types from '../store/action-types';


import {
  getSession
} from '@/utils/local'
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    meta: {
      role: 'admin'
    },
    component: () => import('@/views/Home.vue'),
    redirect: '/overview',
    children: [{
        path: '/overview',
        component: () => import('@/views/overview/Overview.vue'),
        redirect: '/overview/mapMode',
        children: [{
            path: '/overview/mapMode',
            component: () => import('@/views/overview/MapMode.vue'),
          },
          {
            path: '/overview/statisticsMode',
            component: () => import('@/views/overview/StatisticsMode.vue'),
          }
        ]
      },
      {
        path: '/monitor',
        component: () => import('@/views/Monitor.vue'),
      },
      {
        path: '/inspecting',
        component: () => import('@/views/Inspecting.vue'),
      },
      {
        path: '/repair',
        redirect: '/repair/repairOrder',
        component: () => import('@/views/repair/Repair.vue'),
        children: [{
            name: '维修工单',
            path: '/repair/repairOrder',
            component: () => import('@/views/repair/RepairOrder.vue'),
          },
          {
            name: '维修进度',
            path: '/repair/repairProgress',
            component: () => import('@/views/repair/RepairProgress.vue'),
          }
        ]
      },
      {
        path: '/report',
        redirect: '/report/orderReport',
        component: () => import('@/views/report/Report.vue'),
        children: [{
            path: '/report/orderReport',
            component: () => import('@/views/report/OrderReport.vue'),
          },
          {
            path: '/report/taskReport',
            component: () => import('@/views/report/TaskReport.vue'),
          },
          {
            path: '/report/failureReport',
            component: () => import('@/views/report/FailureReport.vue'),
          }
        ]
      },
      {
        path: '/expert',
        component: () => import('@/views/Expert.vue'),
      },
      {
        path: '/account',
        component: () => import('@/views/Account.vue'),
      },
      {
        path: '/role',
        component: () => import('@/views/Role.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const has = getSession('hasPermission');
  if (to.path === '/login' || has) {
    next()
  } else {
    next('/login')
  }
})

export default router
