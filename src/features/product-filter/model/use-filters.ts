import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { DEFAULT_FILTERS } from './constants'
import { parseFilters, serializeFilters } from './filters'
import type { FiltersState } from './types'

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const updateFilters = useCallback(
    (changes: Partial<FiltersState>) => {
      const nextFilters: FiltersState = {
        ...filters,
        ...changes,
      }

      const nextParams = serializeFilters(nextFilters, searchParams)

      nextParams.delete('page')

      setSearchParams(nextParams)
    },
    [filters, searchParams, setSearchParams]
  )

  const resetFilters = useCallback(() => {
    const nextParams = serializeFilters(DEFAULT_FILTERS, searchParams)

    nextParams.delete('page')

    setSearchParams(nextParams)
  }, [searchParams, setSearchParams])

  return {
    filters,
    updateFilters,
    resetFilters,
  }
}
