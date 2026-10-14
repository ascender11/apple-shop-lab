import { useState } from 'react'

import type { Product } from '@/entities/product'
import { useProductStore } from '@/entities/product'

export const useEditProduct = () => {
  const updateProductInStore = useProductStore((state) => state.updateProduct)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editProduct = async (product: Product) => {
    setIsLoading(true)
    setError(null)

    try {
      await updateProductInStore(product)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update product'

      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { editProduct, isLoading, error }
}
