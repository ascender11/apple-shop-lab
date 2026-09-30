import { useEffect, useState } from 'react'

import { productService } from '../api/service'
import type { Product } from '../model/types'

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    productService.getProductById(id).then(setProduct)
  }, [id])

  return product
}
