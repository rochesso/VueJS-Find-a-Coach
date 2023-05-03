import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from '../views/coaches/CoachDetail.vue'
import CoachesList from '../views/coaches/CoachesList.vue'
import CoachRegistration from '../views/coaches/CoachRegistration.vue'
import ContactCoach from '../views/requests/ContactCoach.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import NotFound from '../views/NotFound.vue'

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
      component: CoachRegistration
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestsReceived
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

export default router
