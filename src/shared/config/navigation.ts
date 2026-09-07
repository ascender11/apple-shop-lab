export interface NavLink {
  id: number
  href: string
  label: string
}

export const NAVIGATION_LINKS: NavLink[] = [
  { id: 1, href: '/', label: 'Home' },
  { id: 2, href: '/catalog', label: 'Catalog' },
  { id: 3, href: '/favorites', label: 'Favorites' },
  { id: 4, href: '/cart', label: 'Cart' },
  { id: 5, href: '/delivery', label: 'Delivery' },
]
