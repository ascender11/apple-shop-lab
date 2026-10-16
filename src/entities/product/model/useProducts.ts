import { useCallback, useEffect, useState } from 'react'

import { useProductStore } from './store'

export const useProducts = () => {
  const products = useProductStore((state) => state.products)
  const fetchProducts = useProductStore((state) => state.fetchProducts)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const reload = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      await fetchProducts()
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to load products'))
    } finally {
      setIsLoading(false)
    }
  }, [fetchProducts])

  useEffect(() => {
    void reload()
  }, [reload])

  return { products, isLoading, error, reload }
}
