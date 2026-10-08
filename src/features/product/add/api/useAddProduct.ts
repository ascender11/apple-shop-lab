import { useState } from 'react'

import type { Product } from '@/entities/product'
import { productService } from '@/entities/product'

export const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false)

  const addProduct = async (product: Product) => {
    try {
      setIsLoading(true)
      await productService.createProduct(product)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    addProduct,
    isLoading,
  }
}
