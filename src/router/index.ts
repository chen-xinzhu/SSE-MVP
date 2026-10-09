import { createRouterGuards } from './permission'
import routes from './routes'
import { createWebHashHistory } from 'vue-router'
import { isGithubDeployed } from '@/config'

const history = isGithubDeployed
  ? createWebHashHistory()
  : createWebHistory()


const router = createRouter({
  history,
  routes
})
export default router

export async function setupRouter(app: App) {
  createRouterGuards(router)
  app.use(router)

  await router.isReady()
}
