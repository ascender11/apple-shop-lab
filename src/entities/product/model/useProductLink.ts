import { useLocation } from 'react-router'

export const useProductLink = (productId: string) => {
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  searchParams.set('product', productId)

  return `${location.pathname}?${searchParams.toString()}`
}
