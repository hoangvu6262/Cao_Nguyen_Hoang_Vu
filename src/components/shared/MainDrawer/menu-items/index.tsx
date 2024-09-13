import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

const generals = {
    id: 'generals',
    title: 'generals',
    type: 'group',
    children: [
        {
            id: 'room',
            title: 'Room',
            type: 'item',
            url: '/room',
            icon: <HomeOutlinedIcon />,
            target: true,
        },
        {
            id: 'chart',
            title: 'Chart',
            type: 'item',
            url: '/chart',
            icon: <AutoGraphOutlinedIcon />,
            target: true,
        },
    ],
}

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: <DashboardOutlinedIcon />,
            breadcrumbs: false,
        },
    ],
}

const menuItems = {
    items: [dashboard, generals],
}

export default menuItems
