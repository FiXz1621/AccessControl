//Here the items of the side menu are defined -> they will be the pages that can be accessed in the application

export const MenuItemsSidebar = [
    {
        title: 'Página Principal',
        icon : 'bi bi-house',
        url: '/home',
        cName: 'nav-item'
    },
    {
        title: 'Registro de Entradas',
        icon : 'bi bi-arrow-down-up',
        url: '/access-record',
        cName: 'nav-item'
    },
    {
        title: 'Usuarios',
        icon : 'bi bi-people',
        url: '/users',
        cName: 'nav-item'
    },
    {
        title: 'Puertas',
        icon : 'bi bi-door-open',
        url: '/doors',
        cName: 'nav-item'
    },
    {
        title: 'Roles',
        icon : 'bi bi-person-badge',
        url: '/roles',
        cName: 'nav-item'
    },
]
