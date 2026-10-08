import { useState } from 'react'

import { productService } from '@/entities/product'

export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true)
      await productService.deleteProduct(id)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteProduct,
    isLoading,
  }
}
