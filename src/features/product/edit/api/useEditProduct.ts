import { useState } from 'react'

import type { Product } from '@/entities/product'
import { productService } from '@/entities/product'

export const useEditProduct = () => {
  const [isLoading, setIsLoading] = useState(false)

  const editProduct = async (product: Product) => {
    try {
      setIsLoading(true)
      await productService.updateProduct(product)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    editProduct,
    isLoading,
  }
}
