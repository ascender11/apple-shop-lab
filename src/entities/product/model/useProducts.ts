import { useEffect, useState } from 'react'

import { productService } from '../api/service'
import type { Product } from './types'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productService.getProducts().then(setProducts)
  }, [])

  return products
}
