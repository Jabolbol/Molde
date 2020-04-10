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
        _name: 'CSidebarNavTitle'
      },

      {
        _name: 'CSidebarNavTitle'
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
            to: '/components/MenungguPembayaran'
          },
          {
            name: 'Dalam Pengiriman',
            to: '/components/DalamPengiriman'
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
