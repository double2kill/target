import AdminMenu from './components/Admin/Menu.vue'
import Users from './components/Admin/Users.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import TargetList from './components/TargetList/List.vue'
import MobileList from './pages/Mobile/List.vue'
import StatisticPage from './pages/Statistic/StatisticPage.vue'

export const routes = [
  {
    path: '/',
    name: '首页',
    component: TargetList,
    props: {
      isAdminMode: false
    }
  },
  {
    path: '/mobile',
    name: '手机端',
    component: MobileList,
  },
  {
    path: '/statistic',
    component: StatisticPage,
    name: '统计',
  },
  {
    path: '/admin',
    component: AdminMenu,
    children: [
      {
        path: 'targetList',
        component: TargetList,
        name: '目标列表',
        props: {
          isAdminMode: true
        }
      },
      {
        path: 'users',
        component: Users,
        name: '用户',
      },
      {
        path: ':pathMatch(.*)*',
        component: NotFoundPage
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]