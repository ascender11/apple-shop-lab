export const routes = {
  home: '/',
  catalog: '/catalog',
  favorites: '/favotires',
  cart: '/cart',
  delivery: '/delivery',
  login: '/login',
  product: (id: string) => `/product/${id}`,
}
