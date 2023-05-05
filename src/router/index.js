import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from '../views/coaches/CoachesList.vue'
import store from '../store/index.js'

const CoachDetail = () => import('../views/coaches/CoachDetail.vue')
const CoachRegistration = () => import('../views/coaches/CoachRegistration.vue')
const RequestsReceived = () => import('../views/requests/RequestsReceived.vue')
const ContactCoach = () => import('../views/requests/ContactCoach.vue')
const UserAuth = () => import('../views/auth/UserAuth.vue')
const NotFound = () => import('../views/NotFound.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:coachId',
      name: 'coachDetail',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', name: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/notFound',
      component: NotFound,
      name: 'notFound'
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // The component 'UserAuth' uses the query 'redirect' to redirect a user
    // to another named route after a successful login or signup.
    // The query 'redirect' must be a route name.
    next({ name: 'auth', query: { redirect: to.name } })
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next({ name: 'coaches' })
  } else {
    next()
  }
})

export default router
