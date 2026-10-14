import { useState } from 'react'

import type { Product } from '@/entities/product'
import { useProductStore } from '@/entities/product'

export const useAddProduct = () => {
  const addProductToStore = useProductStore((state) => state.addProduct)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addProduct = async (product: Product) => {
    setIsLoading(true)
    setError(null)

    try {
      await addProductToStore(product)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create product'

      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { addProduct, isLoading, error }
}
