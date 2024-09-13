import { lazy } from 'react'

import Loadable from '@/components/shared/Loader/LoadableComponent'

import DashboardLayout from '@/layouts/DashboardLayout'

const DashboardPage = Loadable(
    lazy(() => import('@/pages/Dashboard/DashboardPage'))
)
const RoomPage = Loadable(lazy(() => import('@/pages/RoomPage/RoomPage')))
const ChartPage = Loadable(lazy(() => import('@/pages/ChartPage/ChartPage')))

const MainRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            path: '/',
            element: <DashboardPage />,
        },
        {
            path: 'dashboard',
            element: <DashboardPage />,
        },
        {
            path: 'room',
            element: <RoomPage />,
        },
        {
            path: 'chart',
            element: <ChartPage />,
        },
    ],
}

export default MainRoutes
