import NProgress from 'nprogress'
import type { Router } from 'vue-router'

NProgress.configure({
  showSpinner: true
})

export function createRouterGuards(router: Router) {
  router.beforeEach(async () => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
