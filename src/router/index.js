import Vue from 'vue';
import Router from 'vue-router';

// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');

// Views - Components
const Products = () => import('@/views/components/Products');
const Create = () => import('@/views/components/Create');
const Orders = () => import('@/views/components/Orders');
const Order = () => import('@/views/components/Order');
const DetailOrder = () => import('@/views/components/DetailOrder');
const UpdateResi = () => import('@/views/components/UpdateResi');
const RequestList = () => import('@/views/components/RequestList');
const RequestToko = () => import('@/views/components/RequestToko');
const ProductsList = () => import('@/views/components/ProductsList');
const ProductsUpdate = () => import('@/views/components/ProductsUpdate');
const Discussion = () => import('@/views/components/Discussion');
const DiscussionDetail = () => import('@/views/components/DiscussionDetail');
const ListBank = () => import('@/views/components/ListBank');
const Category = () => import('@/views/components/Category');
const Profile = () => import('@/views/components/Profile');
const Shop = () => import('@/views/components/Shop');
const Shops = () => import('@/views/components/Shops');

// Pages
const Login = () => import('@/views/pages/Login');
const Register = () => import('@/views/pages/Register');

// Users
const Users = () => import('@/views/components/Users');
const User = () => import('@/views/components/User');

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {requiresAuth: true},
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'components',
          name: 'Components',
          component: {
            render(c) {
              return c('router-view');
            },
          },
          children: [
            {
              path: 'products',
              name: 'products',
              component: Products,
            },
            {
              path: 'create',
              name: 'Create',
              component: Create,
            },
            {
              path: 'orders',
              name: 'Orders',
              component: Orders,
            },
            {
              path: 'orders/:id',
              name: 'Order',
              component: Order,
            },
            {
              path: 'detailOrder',
              name: 'DetailOrder',
              component: DetailOrder,
            },
            {
              path: 'updateResi/:id',
              name: 'UpdateResi',
              component: UpdateResi,
            },
            {
              path: 'request',
              name: 'RequestToko',
              component: RequestToko,
            },
            {
              path: 'request-list',
              name: 'Request List',
              component: RequestList,
            },
            {
              path: 'products-list',
              name: 'Products List',
              component: ProductsList,
            },
            {
              path: 'products-update/:id',
              name: 'Update Product',
              component: ProductsUpdate,
            },
            {
              path: 'discussion',
              name: 'Discussion',
              component: Discussion,
            },
            {
              path: 'discussion-detail/:id',
              name: 'Discussion Detail',
              component: DiscussionDetail,
            },
            {
              path: 'list-bank',
              name: 'List Bank',
              component: ListBank,
            },
            {
              path: 'users',
              name: 'Users',
              component: Users,
            },
            {
              path: 'users/:email',
              name: 'User',
              component: User,
            },
            {
              path: 'category',
              component: Category
            },
            {
              path: 'profile',
              component: Profile
            },
            {
              path: 'shop-list',
              component: Shops
            },
            {
              path: 'shop',
              component: Shop
            }
          ],
        },
      ],
    },
    {
      path: '/pages',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {requiresAuth: false},
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: {requiresAuth: false},
        },
      ],
    },
  ];
}
