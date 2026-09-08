import { createBrowserRouter } from 'react-router'

import { CatalogPage } from '@/pages/catalog/ui/CatalogPage'
import { HomePage } from '@/pages/home'
import { routes } from '@/shared/config'

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.catalog,
    element: <CatalogPage />,
  },
])
