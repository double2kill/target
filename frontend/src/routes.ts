import TargetList from './components/TargetList/List.vue'
import StatisticPage from './pages/Statistic/StatisticPage.vue'
import AdminMenu from './components/Admin/Menu.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import Users from './components/Admin/Users.vue'

export const routes = [
  {
    path: '/',
    component: TargetList,
    props: {
      isAdminMode: false
    }
  },
  {
    path: '/statistic',
    component: StatisticPage,
  },
  {
    path: '/admin',
    component: AdminMenu,
    children: [
      {
        path: 'targetList',
        component: TargetList,
        props: {
          isAdminMode: true
        }
      },
      {
        path: 'users',
        component: Users
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