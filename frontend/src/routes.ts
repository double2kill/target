import AdminMenu from './components/Admin/Menu.vue'
import Users from './components/Admin/Users.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import TargetList from './components/TargetList/List.vue'
import MobileList from './pages/Mobile/List.vue'
import StatisticPage from './pages/Statistic/StatisticPage.vue'
import {是手机设备} from './utils/navigator'

export const routes = [
  {
    path: '/',
    name: '首页',
    component: async () => {
      if (是手机设备()) {
        return MobileList
      }
      return TargetList
    },
    props: {
      isAdminMode: false
    }
  },
  {
    path: '/targetList',
    name: '表格',
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
    path: '/mobile/detail',
    name: '手机端详情',
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