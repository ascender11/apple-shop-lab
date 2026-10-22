import { createBrowserRouter } from 'react-router'

import { AdminPage } from '@/pages/admin'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'
import { CatalogPage } from '@/pages/catalog'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { routes } from '@/shared/config'
import { RootLayout } from '../layouts/RootLayout'
import { AdminGuard } from './AdminGuard'
import { GuestGuard } from './GuestGuard'

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.catalog,
        element: <CatalogPage />,
      },
      {
        element: <AdminGuard />,
        children: [
          {
            path: routes.admin,
            element: <AdminPage />,
          },
        ],
      },
      {
        element: <GuestGuard />,
        children: [
          {
            path: routes.auth.register,
            element: <RegisterPage />,
          },
          {
            path: routes.auth.login,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
