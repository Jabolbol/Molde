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
        name: 'Products',
        to: '/theme/typography',
        icon: 'cil-star'
      },
      {
        _name: 'CSidebarNavItem',
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
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Base',
        route: '/components',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Breadcrumbs',
            to: '/components/breadcrumbs'
          },
          {
            name: 'Cards',
            to: '/components/cards'
          },
          {
            name: 'Carousels',
            to: '/components/carousels'
          },
          {
            name: 'Collapses',
            to: '/components/collapses'
          },
          {
            name: 'Forms',
            to: '/components/forms'
          },
          {
            name: 'Jumbotrons',
            to: '/components/jumbotrons'
          },
          {
            name: 'List Groups',
            to: '/components/list-groups'
          },
          {
            name: 'Navs',
            to: '/components/navs'
          },
          {
            name: 'Navbars',
            to: '/components/navbars'
          },
          {
            name: 'Paginations',
            to: '/components/paginations'
          },
          {
            name: 'Popovers',
            to: '/components/popovers'
          },
          {
            name: 'Progress Bars',
            to: '/components/progress-bars'
          },
          {
            name: 'Switches',
            to: '/components/switches'
          },
          {
            name: 'Tables',
            to: '/components/tables'
          },
          {
            name: 'Tabs',
            to: '/components/tabs'
          },
          {
            name: 'Tooltips',
            to: '/components/tooltips'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Widgets',
        to: '/widgets',
        icon: 'cil-calculator',
        badge: {
          color: 'primary',
          text: 'NEW',
          shape: 'pill'
        }
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      }
    ]
  }
]
