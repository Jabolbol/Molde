export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Molde']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Toko',
        to: '/base/tables',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'User',
        to: '/users',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Register',
        to: '/pages/register',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Logout',
        to: '/pages/login',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Products',
        to: '/components/products',
        icon: 'cil-star'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Orders',
        to: '/components',
        icon: 'cil-chart-pie',
        items: [
          {
            name: 'Menunggu Pembayaran',
            to: '/components/payment'
          },
          {
            name: 'Dalam Pengiriman',
            to: '/components/shipment'
          },
          {
            name: 'Selesai',
            to: '/components/Selesai'
          }
        ]
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      }
    ]
  }
]
