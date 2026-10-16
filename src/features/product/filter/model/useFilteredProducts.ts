import { useCallback, useEffect, useState } from 'react'

import { type FiltersState, type Product, productService } from '@/entities/product'

export const useFilteredProducts = (filters: FiltersState) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { priceMin, priceMax, categories, year } = filters

  const reload = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await productService.getFilteredProducts({
        priceMin,
        priceMax,
        categories,
        year,
      })

      setProducts(data)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to load filtered products'))
    } finally {
      setIsLoading(false)
    }
  }, [priceMin, priceMax, categories, year])

  useEffect(() => {
    void reload()
  }, [reload])

  return { products, isLoading, error, reload }
}
