import { useCallback, useEffect, useState } from 'react'

import { productService } from '../api/service'
import type { Product } from './types'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const reload = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await productService.getProducts()

      setProducts(data)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to load products'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return {
    products,
    isLoading,
    error,
    reload,
  }
}
