import { childrenRoutes } from './child-routes'

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'ChatRoot'
    }
  },
  ...childrenRoutes,
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404/notFound.vue')
  }
]

export default routes
