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
        to: '/components/users',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Products',
        to: '/components/products-list',
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
        _name: 'CSidebarNavDivider',
        _class: 'm-2',
      },
    ],
  },
];
