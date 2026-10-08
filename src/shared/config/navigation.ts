import { routes } from './routes'

export interface NavLink {
  id: number
  href: string
  label: string
}

export const NAVIGATION_LINKS: NavLink[] = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.catalog, label: 'Catalog' },
  { id: 3, href: routes.favorites, label: 'Favorites' },
  { id: 4, href: routes.cart, label: 'Cart' },
  { id: 5, href: routes.delivery, label: 'Delivery' },
  { id: 6, href: routes.admin, label: 'Admin' },
]
