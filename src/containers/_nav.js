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
        name: 'Toko',
        to: '/components/shops',
        icon: 'cil-star',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kategori',
        to: '/components/Category',
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
