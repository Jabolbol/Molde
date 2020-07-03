import Vue from 'vue';
import Router from 'vue-router';

// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');

const Charts = () => import('@/views/charts/Charts');
const Widgets = () => import('@/views/widgets/Widgets');

// Views - Components
const Breadcrumbs = () => import('@/views/components/Breadcrumbs');
const Tables = () => import('@/views/components/Tables');
const Tabs = () => import('@/views/components/Table');
const Forms = () => import('@/views/components/Forms');
const Products = () => import('@/views/components/Products');
const ProductCreate = () => import('@/views/components/ProductCreate');
const ProductList = () => import('@/views/components/ProductList');
const ProductDetail = () => import('@/views/components/ProductDetail');
const ProductUpdate = () => import('@/views/components/ProductUpdate');
const Order = () => import('@/views/components/Order');
const OrderInProgress = () => import('@/views/components/OrderInProgress');
const OrderDetail = () => import('@/views/components/OrderDetail');
const UpdateResi = () => import('@/views/components/UpdateResi')
const RequestList = () => import('@/views/components/RequestList')
const RequestToko = () => import('@/views/components/RequestToko');
const Discussion = () => import('@/views/components/Discussion');
const DiscussionDetail = () => import('@/views/components/DiscussionDetail');
const Bank = () => import('@/views/components/Bank');
const Category = () => import('@/views/components/Category');

// Pages
const Login = () => import('@/views/pages/Login');
const Register = () => import('@/views/pages/Register');

// Users
const Users = () => import('@/views/users/Users');
const User = () => import('@/views/users/User');

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
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
          component: Dashboard,
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts,
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets,
        },
        {
          path: 'users',
          meta: {
            label: 'Users',
          },
          component: {
            render(c) {
              return c('router-view');
            },
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users,
            },
            {
              path: ':id',
              meta: {
                label: 'User Details',
              },
              name: 'User',
              component: User,
            },
          ],
        },
        {
          path: 'components',
          redirect: '/components/cards',
          name: 'Components',
          component: {
            render(c) {
              return c('router-view');
            },
          },
          children: [
            {
              path: 'tables',
              name: 'Tables',
              component: Tables,
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs,
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs,
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms,
            },
            {
              path: 'products',
              name: 'products',
              component: Products,
            },
            {
              path: 'productCreate',
              name: 'ProductCreate',
              component: ProductCreate,
            },
            {
              path: 'productList',
              name: 'ProductList',
              component: ProductList,
            },
            {
              path: 'productDetail/:id',
              name: 'ProductDetail',
              component: ProductDetail,
            },
            {
              path: 'productUpdate/:id',
              name: 'ProductUpdate',
              component: ProductUpdate,
            },
            {
              path: 'order',
              name: 'Order',
              component: Order,
            },
            {
              path: 'orderInProgress',
              name: 'OrderInProgress',
              component: OrderInProgress,
            },
            {
              path: 'orderDetail/:id',
              name: 'OrderDetail',
              component: OrderDetail,
            },
            {
                path: 'updateResi/:id',
                name: 'UpdateResi',
                component: UpdateResi
            },
            {
              path: 'request',
              name: 'RequestToko',
              component: RequestToko,
            },
            {
              path: 'requestList',
              name: 'RequestList',
              component: RequestList,
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
              path: 'bank',
              name: 'Bank',
              component: Bank,
            },
            {
              path: 'category',
              name: 'Category',
              component: Category,
            },
          ],
        },
        {
          path: 'pages',
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
            },
            {
              path: 'register',
              name: 'Register',
              component: Register,
            },
          ],
        },
      ],
    },
  ];
}
