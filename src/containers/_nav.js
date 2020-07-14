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
        name: 'Request',
        to: '/components/request-list',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Toko',
        to: '/components/shop-list',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kategori',
        to: '/components/category',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Bank',
        to: '/components/list-bank',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2',
      },
    ],
  },
];
