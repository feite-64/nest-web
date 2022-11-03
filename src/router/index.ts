import {
  createRouter,
  RouteRecordRaw,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    transition?: string
    icon?: string
    rules?: number
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/shop',
    children: [
      {
        path: '/shop',
        component: () => import('@/view/shop/ShopView.vue'),
        meta: {
          title: '商店',
          transition: 'animate__wobble',
          icon: '',
          rules: 1
        }
      },
      {
        path: '/shop/:id',
        component: () => import('@/view/shop/Shop.vue'),
        meta: {
          title: '商品',
          transition: 'animate__backInDown'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/view/LoginView.vue'),
    meta: {
      title: '登录界面',
      transition: 'animate__backInDown'
    },
    // 访问登录之前执行
    beforeEnter: (to, from, next) => {
      // 存在token就直接进入主界面
      if (localStorage.getItem('token') !== null) {
        next('/')
      } else {
        // 否则就进入登录界面
        next()
      }
    }
  },
  {
    path: '/virtualList',
    component: () => import('@/view/VirtualList/VirtualList.vue'),
    meta: {
      title: '虚拟列表',
      transition: 'animate__backInDown'
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  // 记录滚动距离 savePosition进行缓存
  // scrollBehavior: (to, from, savePosition) => {
  //   console.log(savePosition)
  //   if (savePosition) {
  //     return savePosition
  //   } else {
  //     return { top: 0 }
  //   }
  // },
  routes
})
//to 去哪里
//from 从哪来
//next 继续执行
router.beforeEach((to, from, next) => {
  // 标签标题
  document.title = to.meta.title
  // const token: string | null = localStorage.getItem('token')
  if (localStorage.getItem('token') === null && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
