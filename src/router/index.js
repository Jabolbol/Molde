import Vue from 'vue'
import Router from 'vue-router'


// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Breadcrumbs = () => import('@/views/components/Breadcrumbs')
const Tables = () => import('@/views/components/Tables')
const Tabs = () => import('@/views/components/Table')
const Products = () => import('@/views/components/Products')
const Create = () => import('@/views/components/Create')
const Orders = () => import('@/views/components/Orders')
const Payment = () => import('@/views/components/MenungguPembayaran')
const Shipment = () => import('@/views/components/DalamPengiriman')
const Done = () => import('@/views/components/Selesai')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'components',
          redirect: '/components/cards',
          name: 'Components',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'products',
              name: 'products',
              component: Products
            },
            {
              path: 'create',
              name: 'Create',
              component: Create
            },
            {
              path: 'orders',
              name: 'Orders',
              component: Orders
            },
            {
              path: 'payment',
              name: 'Payment',
              component: Payment
            },
            {
              path: 'shipment',
              name: 'Shipment',
              component: Shipment
            },
            {
              path: 'done',
              name: 'Done',
              component: Done
            }
          ]
        }
      ]
    }
  ]
}

