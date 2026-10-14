import { useState } from 'react'

import { useProductStore } from '@/entities/product'

export const useDeleteProduct = () => {
  const deleteProductFromStore = useProductStore((state) => state.deleteProduct)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteProduct = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await deleteProductFromStore(id)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete product'

      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteProduct, isLoading, error }
}
