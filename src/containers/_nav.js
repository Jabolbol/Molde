export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        // badge: {
        //   color: 'primary',
        //   text: 'NEW',
        // },
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Admin'],
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'User',
      //   to: '/users',
      //   icon: 'cil-chart-pie',
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Daftar Request',
        to: '/components/requestList',
        icon: 'cil-star'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Category',
        to: '/components/category',
        icon: 'cil-star'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Bank',
        to: '/components/bank',
        icon: 'cil-star'
      },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Shop Owner'],
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Product',
      //   to: '/components/productList',
      //   icon: 'cil-star',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Order',
      //   to: '/components/order',
      //   icon: 'cil-star',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Discussion',
      //   to: '/components/discussion',
      //   icon: 'cil-star',
      // },
      // {
      //   _name: 'CSidebarNavDivider',
      //   _class: 'm-2',
      // },
    ],
  },
];
