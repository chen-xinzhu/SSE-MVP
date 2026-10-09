export const childrenRoutes = [
  {
    path: '/chat',
    component: () => import('@/views/layout/default.vue'),
    name: 'ChatRoot',
    redirect: {
      name: 'ChatIndex'
    },
    children: [
      {
        path: '',
        name: 'ChatIndex',
        component: ()=>import('@/views/chat/chatIndex.vue')
      }
    ]

  }
]
