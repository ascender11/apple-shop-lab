import { routes } from './routes'

export interface NavLink {
  id: number
  href: string
  label: string
}

export const NAVIGATION_LINKS: NavLink[] = [
  { id: 1, href: routes.home, label: 'home' },
  { id: 2, href: routes.catalog, label: 'catalog' },
  { id: 3, href: routes.favorites, label: 'favorites' },
  { id: 4, href: routes.cart, label: 'cart' },
  { id: 5, href: routes.delivery, label: 'delivery' },
  { id: 6, href: routes.admin, label: 'admin' },
]
