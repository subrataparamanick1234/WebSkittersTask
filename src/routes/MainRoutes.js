/* eslint-disable react/destructuring-assignment */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (userRoot) => [
    {
        path: '/',
        element: userRoot.isAuthenticated ? <Navigate to="/dashboard" /> : <MinimalLayout />,
        children: [
            {
                path: '/',
                element: <AuthLogin3 />
            },
            {
                path: '/register',
                element: <AuthRegister3 />
            }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/dashboard',
                element: userRoot.isAuthenticated ? <DashboardDefault /> : <Navigate to="/" />
            }
        ]
    }
];

export default MainRoutes;
