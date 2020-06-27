export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Molde'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'User',
        to: '/users',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Products',
        to: '/components/productsList',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Orders',
        to: '/components/orders',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Discussion',
        to: '/components/discussion',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Export Data',
        to: '/components/export-data',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2',
      },
    ],
  },
];
