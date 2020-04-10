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
<<<<<<< HEAD
        _name: 'CSidebarNavTitle'
=======
        _name: 'CSidebarNavTitle',
        _children: ['Molde']
>>>>>>> 536ce0f18c6e81dadd49a1e30c520bbae0c2ef3b
      },

      {
        _name: 'CSidebarNavTitle'
      },
      {
        _name: 'CSidebarNavItem',
<<<<<<< HEAD
        name: 'Products',
        to: '/components/products',
        icon: 'cil-star'
=======
        name: 'Statistic',
        to: '/charts',
        icon: 'cil-chart-pie'
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
        _name: 'CSidebarNavTitle',
        _children: ['Components']
>>>>>>> 536ce0f18c6e81dadd49a1e30c520bbae0c2ef3b
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
