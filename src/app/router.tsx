import { createBrowserRouter } from 'react-router'

import { CatalogPage } from '@/pages/catalog/ui/CatalogPage'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { routes } from '@/shared/config'
import { RootLayout } from './layouts/RootLayout'

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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
